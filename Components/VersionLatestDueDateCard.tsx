'use client'

import { buildIssuesMap, buildSortedFirstDueDateMap } from '@/lib/Utils'
import { useIssuesStore } from '@/store/issuesStore'
import React from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';


export function VersionLatestDueDateCard() {
  const {issues} = useIssuesStore()
  const issuesByVersion = buildIssuesMap(issues, 'fixed_version')

  const sortedVersions = Object.keys(issuesByVersion).sort()
  const latestDueDateByVersion = buildSortedFirstDueDateMap(issuesByVersion as any, 'desc');
  
  console.log(`VersionLatestDueDateCard render`)
  return (
    <Container disableGutters >
      {sortedVersions.map((version) => (
          <Card key={`${version}-last-due-date`} >
            <CardContent>
              <Typography variant="h5" component="div">
                {version}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Latest Due Date: {latestDueDateByVersion[version]?.revised_due_date || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
      ))}
    </Container>
  )
}