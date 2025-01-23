'use client'

import { buildIssuesMap, buildSortedFirstDueDateMap } from '@/lib/Utils'
import { useIssuesStore } from '@/store/issuesStore'
import React from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';


export function VersionLatestDueDateCard() {
  const {issues} = useIssuesStore()
  console.log(`issues: ${issues}`)
  const issuesByVersion = buildIssuesMap(issues, 'fixed_version')

  const sortedVersions = Object.keys(issuesByVersion).sort()
  console.log(`issuesByversion`, issuesByVersion)
  const latestDueDateByVersion = buildSortedFirstDueDateMap(issuesByVersion as any, 'desc');
  
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