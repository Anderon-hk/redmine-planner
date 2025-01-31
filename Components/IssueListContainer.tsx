'use client';

import { useIssuesStore } from '@/store/issuesStore';
import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography } from '@mui/material';
import { IssueNumberrenderer } from './IssueNumberRenderer';
import { clearBackendIssues, clearIssues } from '@/lib/Utils';
import { IssueTrackerRenderer } from './IssueTrackerRenderer';
import { PriorityRenderer } from './PriorityRenderer';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, 
    renderCell: IssueNumberrenderer
  },
  { field: 'project', headerName: 'Project', width: 150 },
  { field: 'tracker', headerName: 'Tracker', width: 200, renderCell: IssueTrackerRenderer },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'priority', headerName: 'Priority', width: 150, renderCell: PriorityRenderer },
  // { field: 'author', headerName: 'Author', width: 150 },
  // { field: 'assigned_to', headerName: 'Assigned To', width: 150 },
  { field: 'fixed_version', headerName: 'Version', width: 200 },
  { field: 'subject', headerName: 'Subject', width: 300 },
  { field: 'description', headerName: 'Description', width: 150 },
  { field: 'due_date', headerName: 'Due Date', width: 100 },
  { field: 'revised_due_date', headerName: 'Revised Due Date', width: 120 },
  { field: 'done_ratio', headerName: 'Done Ratio', width: 100 },
  // { field: 'updated_on', headerName: 'Updated On', width: 150 },
  // { field: 'created_on', headerName: 'Created On', width: 150 },
  { field: 'estimated_hours', headerName: 'Estimated Hours', width: 150 },
  { field: 'site', headerName: 'Site', width: 150 },
  { field: 'dev_time', headerName: 'Dev Time', width: 150 },
];

const clearIssueHandler = async () => {
  let result = await clearBackendIssues();
  if(!result) {
    console.error('fail to clear backend data');
  }
  clearIssues()
}

export default function IssuesListContainer() {
  const { issues, fetchIssues } = useIssuesStore();
  return (
    <Container
      disableGutters
      maxWidth={false}
    >
      <Stack
        direction="row-reverse"
        gap={1}
      >

        <Button variant="contained" color="primary" onClick={fetchIssues}
          fullWidth={false}
        >
          Fetch Issues
        </Button>

        <Button variant='contained' color='info' onClick={clearIssueHandler} >
          Clear Issuess
        </Button>
      </Stack>
      <div style={{ height: 600, width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
        <DataGrid rows={issues} columns={columns} />
      </div>
    </Container>
  );
}