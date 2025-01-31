'use client'

import { GroupedIssues, issueGroupStore } from '@/store/issueGroupStore'
import { Issue } from './RedmineTyping';
import { query } from '@chronicstone/array-query';
import { getPriority } from 'os';
import { issueStore } from '@/store/issuesStore';
import { CrossDueDateCheck, issueWarningStore, PriorityDueDateWarning, VersionsLastestDueDate } from '@/store/issueWarningStore';

export const sortDateKyes = (groupedIssues: GroupedIssues) => Object.keys(groupedIssues).sort()

// Utility function to convert an array of issues into a map
export function buildIssuesMap(issues: Issue[], keyField: keyof Issue): Record<string|number, Issue[]> {
  return issues.reduce((map, issue) => {
    if(!map[issue[keyField]]) {
      map[issue[keyField]] = [issue];
    }
    else{
      map[issue[keyField]].push(issue);
    }
    return map;
  }, {} as Record<string|number, Issue[]>);
}

export function buildMapByKey(issues: Issue[], key: keyof Issue) {
  return issues.reduce((map, issue) => {
    map[issue[key]] = issue
    return map;
  }, {} as Record<string|number, Issue>);
}

export type IssuesByKeyMap<K extends keyof Issue> = Record<Issue[K], Issue>;

export function buildSortedFirstDueDateMap(issuesByVersion: Record<string, Issue[]>, direction: 'asc' | 'desc'): IssuesByKeyMap<'fixed_version'>{
  let mapping : IssuesByKeyMap<'fixed_version'> = {}
  Object.keys(issuesByVersion).forEach(version => {
    let issues = issuesByVersion[version];
    if(issues && issues.length > 0) {
      let firstDate = query(issues, {
        sort: {
          key: 'revised_due_date',
          dir: direction
        }
      })[0]
      mapping[version] = firstDate
    }
  });
  return mapping
}

export function issueVersionComparator(version1: Issue['fixed_version'], version2: Issue['fixed_version']) {
  if(version1 === 'None') return 1
  if(version2 === 'None') return -1
  return version1.localeCompare(version2, undefined, {numeric: true})
}

export function getFieldValuesSet<F extends keyof Issue>(issues: Issue[], field: F, comparator: (a: Issue[F], b: Issue[F]) => number): Issue[F][] {
  let values = new Set<Issue[F]>()
  issues.forEach(issue =>
    values.add(issue[field])
  );

  let valueArray = Array.from(values);
  return valueArray.sort(comparator || undefined);
}

const PriorityOrder : Record<Issue['priority'], number> = {
  'immediate': 0,
  'urgent': 1,
  'high': 2,
  'medium': 3,
  'low': 4,
}

export const getPriorityOrder = (priority: Issue['priority']) => {
  return PriorityOrder[priority.toLowerCase()] || Infinity;
}

export function IssuePriorityComparator(issue1: Issue['priority'], issue2: Issue['priority']): number {
  let issue1Priority = PriorityOrder[issue1.toLowerCase()] || Infinity;
  let issue2Priority = PriorityOrder[issue2.toLocaleLowerCase()] || Infinity;
  return issue1Priority - issue2Priority;
}

export function clearIssues() {
  const {setIssues} = issueStore.getState()
  const {setGroupedIssues} = issueGroupStore.getState()
  setIssues([])
  setGroupedIssues([]);
}

export async function clearBackendIssues() {
  let res = await fetch('/api/issues/clear')
  if(res.ok && res.status === 200) {
    return true
  }
  return false
}

function checkCrossDueDate(issuesByVersionEarliestDue: IssuesByKeyMap<'fixed_version'>, issuesByVersionLastDue: IssuesByKeyMap<'fixed_version'>, sortedVersions: Issue['fixed_version'][] ) {
  let crossedVersions : CrossDueDateCheck[] = [];
  for (let i = 0; i < sortedVersions.length - 1; i++) {
      const preVer = sortedVersions[i];
      const preVerLastDueDate = issuesByVersionLastDue[preVer]?.revised_due_date || null;

      for (let j = i + 1; j < sortedVersions.length; j++) {
          const nextVer = sortedVersions[j];
          const nextVerEarliestDueDate = issuesByVersionEarliestDue[nextVer]?.revised_due_date || null;

          if (preVerLastDueDate && nextVerEarliestDueDate && preVerLastDueDate > nextVerEarliestDueDate) {
              crossedVersions.push({preVer, nextVer});
          }
      }
  }
  return crossedVersions
}

export function warningCheck() {
  const {issues, issuesVersions, versions} = issueStore.getState()
  const issuesByVersion = buildIssuesMap(issues, 'fixed_version')
  const {setVersionsLastestDueDate, setCrossDueDateCheck, setPriorityDueDateWarnings} = issueWarningStore.getState()

  // version latest due
  const latestDueDateByVersion = buildSortedFirstDueDateMap(issuesByVersion as any, 'desc');
  let versionLatestDueDates: VersionsLastestDueDate[] = [];
 
  issuesVersions.forEach(ver => {
    versionLatestDueDates.push({
      version: ver,
      versionDueDate: versions[ver],
      latestDueDate: latestDueDateByVersion[ver]?.revised_due_date,
      hasWarning: (versions[ver] && versions[ver] < latestDueDateByVersion[ver]?.revised_due_date) ? true : false
    })
  })

  setVersionsLastestDueDate(versionLatestDueDates)

  // cross version due date warning
  const issuesByVersionEarliestDue = buildSortedFirstDueDateMap(issuesByVersion as any, 'asc');

  const crossedVersions = checkCrossDueDate(issuesByVersionEarliestDue, latestDueDateByVersion, issuesVersions)
  setCrossDueDateCheck(crossedVersions)

  // priority due date check
  let priorityDueDateWarningCheck:Set<string> = new Set()
  let priorityDueDateWarnings: PriorityDueDateWarning[] = []

  for(const version of issuesVersions){
    const issuesByPriority = buildIssuesMap(issuesByVersion[version], 'priority')
    const priorities = getFieldValuesSet(issuesByVersion[version], 'priority', IssuePriorityComparator)
    for(let i = 0; i < priorities.length; i++) {
      const curPriorityLastDueIssue = query(issuesByPriority[priorities[i]], {
        sort: {
          key: 'revised_due_date',
          dir: 'desc'
        }
      })[0];

      const toCheckPriorities = priorities.slice(i + 1)
     
      let toCheckIssues = query(issuesByVersion[version], {
        filter: [
          {
            operator: 'AND',
            filters: toCheckPriorities.map(pr => ({
              key: 'priority',
              matchMode: 'equals',
              value: pr,
            })) || [] 
          },
        ]
      })

      // further filter by due date
      toCheckIssues = query(toCheckIssues, {
        filter: [
          {
            key: 'revised_due_date',
            value: curPriorityLastDueIssue.revised_due_date,
            matchMode: 'greaterThan',
            params: {
              dateMode: true
            }
          }
        ]
      })

      if(toCheckIssues.length > 0) {
        toCheckIssues.forEach(issue => {
          const checkKey = `${version}-${priorities[i]}-${toCheckIssues[0].priority}`
          if(!priorityDueDateWarningCheck.has(checkKey)) {
            priorityDueDateWarningCheck.add(checkKey)
            priorityDueDateWarnings.push({
              version: version,
              higherPriority: priorities[i],
              lowerPriority: toCheckIssues[0].priority,
            })
          }
        })
      }

    }
  }

  setPriorityDueDateWarnings(priorityDueDateWarnings)
  
}