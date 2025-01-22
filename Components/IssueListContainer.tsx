'use client';

import { useIssuesStore } from '@/store/issuesStore';
import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'project', headerName: 'Project', width: 150 },
  { field: 'tracker', headerName: 'Tracker', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'priority', headerName: 'Priority', width: 150 },
  // { field: 'author', headerName: 'Author', width: 150 },
  // { field: 'assigned_to', headerName: 'Assigned To', width: 150 },
  { field: 'fixed_version', headerName: 'Version', width: 150 },
  { field: 'subject', headerName: 'Subject', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'due_date', headerName: 'Due Date', width: 150 },
  { field: 'revised_due_date', headerName: 'Revised Due Date', width: 150 },
  { field: 'done_ratio', headerName: 'Done Ratio', width: 150 },
  // { field: 'updated_on', headerName: 'Updated On', width: 150 },
  // { field: 'created_on', headerName: 'Created On', width: 150 },
  { field: 'estimated_hours', headerName: 'Estimated Hours', width: 150 },
  { field: 'site', headerName: 'Site', width: 150 },
  { field: 'dev_time', headerName: 'Dev Time', width: 150 },
];

export default function IssuesListContainer() {
  const { issues, fetchIssues } = useIssuesStore();
  return (
    <Container
      disableGutters
      maxWidth={false}
    >
      <Stack
        direction="row-reverse"
      >

        <Button variant="contained" color="primary" onClick={fetchIssues}
          fullWidth={false}
        >
          Fetch Issues
        </Button>
      </Stack>
      <div style={{ height: 600, width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
        <DataGrid rows={issues} columns={columns} />
      </div>
    </Container>
  );
}