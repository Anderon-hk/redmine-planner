'use client';

import { useIssuesStore } from '@/store/issuesStore';
import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography } from '@mui/material';
import { query } from '@chronicstone/array-query';
import { buildIssuesMap } from '@/lib/Utils';
import { Issue } from '@/lib/RedmineTyping';
import { IssueNumberrenderer } from './IssueNumberRenderer';
import { IssueTrackerRenderer } from './IssueTrackerRenderer';
import { PriorityRenderer } from './PriorityRenderer';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, renderCell: IssueNumberrenderer },
  { field: 'project', headerName: 'Project', width: 150 },
  { field: 'tracker', headerName: 'Tracker', width: 200, renderCell: IssueTrackerRenderer },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'priority', headerName: 'Priority', width: 150, renderCell: PriorityRenderer },
  // { field: 'author', headerName: 'Author', width: 150 },
  // { field: 'assigned_to', headerName: 'Assigned To', width: 150 },
  { field: 'fixed_version', headerName: 'Version', width: 150 },
  { field: 'subject', headerName: 'Subject', width: 200 },
  // { field: 'description', headerName: 'Description', width: 300 },
  { field: 'due_date', headerName: 'Due Date', width: 150 },
  { field: 'revised_due_date', headerName: 'Revised Due Date', width: 150},
  // { field: 'done_ratio', headerName: 'Done Ratio', width: 150 },
  // { field: 'updated_on', headerName: 'Updated On', width: 150 },
  // { field: 'created_on', headerName: 'Created On', width: 150 },
  { field: 'estimated_hours', headerName: 'Estimated Hours', width: 150 },
  // { field: 'site', headerName: 'Site', width: 150 },
  // { field: 'dev_time', headerName: 'Dev Time', width: 150 },
];

function buildSelctCode(issues: Issue['id'][]): string {
  let code = ''
  issues.forEach(issue => {
    code += `document.querySelector('input[value="${issue}"]')?.click();`
  })
  return code
}

async function createCopyToClipBoard(code: string) {
  await navigator.clipboard.writeText(code)
  console.log('Code copied to clipboard')
}

export default function IssuesListDiffContainer() {
  const { issues, fetchIssues } = useIssuesStore();

  const diffIusses = issues.filter(issue => issue.revised_due_date !== issue.due_date);

  const groupByDueDate = buildIssuesMap(diffIusses, 'revised_due_date')
  const dueDates = Object.keys(groupByDueDate).sort()


  return (
    <Container
      disableGutters
      maxWidth={false}
    >
      <Stack
        direction="row"
        spacing={2}
      >
        {
          dueDates.map(date => (
            <Button key={date} variant="contained" color="primary" 
              fullWidth={false}
              onClick={() => {
                const issues = groupByDueDate[date].map(issue => issue.id)
                const code = buildSelctCode(issues)
                createCopyToClipBoard(code)
              }}
            >
              Select Issues for {date}
            </Button>

          ))
        }

        <Button variant="contained" color="primary" onClick={fetchIssues}
          fullWidth={false}
        >
          Fetch Issues
        </Button>
      </Stack>
      <div style={{ height: 600, width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
        <DataGrid rows={diffIusses} columns={columns} 
          sortModel={[{field: 'revised_due_date', sort: 'asc'}]}
        />
      </div>
    </Container>
  );
}