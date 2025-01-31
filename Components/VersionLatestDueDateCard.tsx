'use client'

import { buildIssuesMap, buildSortedFirstDueDateMap, issueVersionComparator } from '@/lib/Utils'
import { useIssuesStore } from '@/store/issuesStore'
import React from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';
import { Issue } from '@/lib/RedmineTyping';
import { query } from '@chronicstone/array-query';
import { useIssueWarningStore } from '@/store/issueWarningStore';
import { useShallow } from 'zustand/shallow';

function getLastDueDateIssues(issues: Issue[] ){
  const lastDueDate = query(issues, {
    sort: {
      key: 'revised_due_date',
      dir: 'desc'
    }
  })[0];

  return lastDueDate
}

export function VersionLatestDueDateCard() {
  const versionsLastestDueDate = useIssueWarningStore(useShallow(state => state.versionsLastestDueDate))

  return (
    <Container disableGutters >
      {versionsLastestDueDate.map((versionData) => (
          <Card key={`${versionData.version}-last-due-date`} >
            <CardContent>
              <Typography variant="subtitle1" component="div">
                {versionData.version}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Version Due Date: {versionData.versionDueDate || 'N/A'}
              </Typography>
              <Typography variant="body2" color={versionData.hasWarning ? 'warning': 'textSecondary'} >
                Latest Due Date: {versionData.latestDueDate || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
      ))}
    </Container>
  )
}