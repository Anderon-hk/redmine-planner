'use client'

import { GroupedIssues, useIssueGroupStore } from '@/store/issueGroupStore';
import { useIssuesStore } from '@/store/issuesStore';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { DateDropZone } from './DateDropZone';
import { AppBar, Box, Button, Card, Container, Drawer, Grid2 as Grid, List, ListItem, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import { IssueCard } from './IssueCard';
import { DueDateSetDialog } from './DueDateSetDialog';
import { sortDateKyes } from '@/lib/Utils';
import { VersionLatestDueDateCard } from './VersionLatestDueDateCard';
import CrossVersionDueDateWarning from './CrossVersionDueDateWarning';
import { PriorityDueDateWarning } from './PriorityDueDateWarning';

export default function IssuePlannerContainer() {
  const {issues, setIssues} = useIssuesStore();
  const {groupedIssues, setGroupedIssues} = useIssueGroupStore();

  const [dueDateKeysSorted, setDueDateKeysSorted] = useState(sortDateKyes(groupedIssues))

  const [openDateKey, setOpenDateKey] = useState(false);
  const handleOpen = () => setOpenDateKey(true);
  const handleClose = () => setOpenDateKey(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(true)

  useEffect(() => {
    setGroupedIssues(issues);
  }, [issues, setGroupedIssues])

  useEffect(() => {
    setDueDateKeysSorted(sortDateKyes(groupedIssues))
  }, [groupedIssues])

  const handler = (event: DragEndEvent) => {
    if(event.active && event.over){
      let targetIssue = issues.find((issue) => issue.id === event.active.id);
      if(targetIssue){
        targetIssue.revised_due_date = event.over.id as string;
        setIssues([...issues]);
      }
    }
  }

  const addDueDate = (newDateKey: string) => {
    if (newDateKey && !dueDateKeysSorted.includes(newDateKey)) {
      setDueDateKeysSorted([...dueDateKeysSorted, newDateKey].sort());
    }
  }

  const toggleDrawer = () => {
    setRightDrawerOpen((val) => !val)
  }

  console.log('IssuePlanner render')
  
  return (
    <>
    <Container maxWidth={false} disableGutters
      sx={{
        display: 'flex'

      }}
    >
      <Container maxWidth={false} disableGutters >
        <AppBar position='static'>
          <Toolbar>
            <Button color="primary" onClick={handleOpen} variant="contained" >
                Add Date Drop Zone
            </Button>
            <Button onClick={toggleDrawer}>
              Open Drawer
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth={false} disableGutters 
          sx={{
            mt:1,
            display: 'flex',
            flexDirection: 'row'
          }}
          
        >

          <DndContext
            onDragEnd={handler}
          >
              <Grid container spacing={2} columns={9} >
                {
                  dueDateKeysSorted?.map((key) => {
                    return (
                      <Grid size={3} key={`${key}-grid`} >
                        <DateDropZone key={key} dateKey={key}> 
                          {groupedIssues[key]?.map((issue) => {
                            return (
                                <IssueCard key={issue.id} issueObject={issue} >{issue.id} {issue.subject}</IssueCard>
                            )
                          })}
                        </DateDropZone>
                      </Grid>
                  )
                })
                }
              </Grid>
          </DndContext>
        </Container>
      </Container>
      <Container disableGutters
        sx={{
          width: '20%',
          display: rightDrawerOpen ? 'block' : 'none'
        }}
      >
        <VersionLatestDueDateCard />
        <CrossVersionDueDateWarning />
        <PriorityDueDateWarning />
      </Container>
    </Container>
    <DueDateSetDialog open={openDateKey} handleClose={handleClose} handleAddDateDropZone={addDueDate} />
    </>
  );
}