import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { Chip, Container, Paper, Typography } from '@mui/material';
import { useIssueGroupStore } from '@/store/issueGroupStore';

export type DateDropZoneType = {dateKey: string|number;  children: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }

export function DateDropZone({dateKey, children}: DateDropZoneType) {
  const {isOver, setNodeRef} = useDroppable({
    id: dateKey,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  const {groupedIssues} = useIssueGroupStore()
  
  const totalDevHours = groupedIssues[dateKey]?.reduce((total, issue) => total + (parseInt(issue.dev_time) || 0), 0) || 0;

  return (
    <Paper ref={setNodeRef} style={style} 
      elevation={2}
      sx={{
        mr: 1,
        height: '100%'
      }}
      variant='outlined'
    >
      <Container disableGutters 
        sx={{p: 1}}
      >
        <Typography fontSize={'1.2rem'} >
          {dateKey}

          <Chip sx={{ml:1}} label={`(${totalDevHours}H)`} component='span' />
        </Typography>
        {children}
      </Container>
    </Paper>
  );
}