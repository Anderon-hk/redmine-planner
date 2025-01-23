'use client'

import { GroupedIssues } from '@/store/issueGroupStore'
import { Issue } from './RedmineTyping';
import { query } from '@chronicstone/array-query';

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

export function buildSortedFirstDueDateMap(issuesByVersion: Record<string, Issue[]>, direction: 'asc' | 'desc') {
  let map = new Map<string, Issue>();
  Object.keys(issuesByVersion).forEach(version => {
    let issues = issuesByVersion[version];
    if(issues && issues.length > 0) {
      let firstDate = query(issues, {
        sort: {
          key: 'revised_due_date',
          dir: direction
        }
      })[0]
      map.set(version, firstDate)
    }
  });
  return map
}