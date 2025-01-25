'use client'

import { GroupedIssues } from '@/store/issueGroupStore'
import { Issue } from './RedmineTyping';
import { query } from '@chronicstone/array-query';
import { getPriority } from 'os';

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