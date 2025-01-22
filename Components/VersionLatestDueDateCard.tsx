'use client'

import { Issue } from '@/lib/RedmineTyping';
import { buildIssuesMap } from '@/lib/Utils'
import { useIssuesStore } from '@/store/issuesStore'
import { query } from '@chronicstone/array-query';
import React from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

function buildLastDueDateMap(issuesByVersion: Record<string, Issue[]>, direction: 'asc' | 'desc') {
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

export function VersionLatestDueDateCard() {
  const {issues} = useIssuesStore()
  console.log(`issues: ${issues}`)
  const issuesByVersion = buildIssuesMap(issues, 'fixed_version')

  const sortedVersions = Object.keys(issuesByVersion).sort()
  console.log(`issuesByversion`, issuesByVersion)
  const latestDueDateByVersion = buildLastDueDateMap(issuesByVersion as any, 'desc');
  
  console.log(latestDueDateByVersion)
  return (
    <Container>
      {sortedVersions.map((version) => (
          <Card key={`${version}-last-due-date`} >
            <CardContent>
              <Typography variant="h5" component="div">
                {version}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Latest Due Date: {latestDueDateByVersion.get(version)?.revised_due_date || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
      ))}
    </Container>
  )
}