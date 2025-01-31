'use client'

import React from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';
import { useIssueWarningStore } from '@/store/issueWarningStore';
import { useShallow } from 'zustand/shallow';

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