import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { Chip, Container, Paper, Typography } from '@mui/material';
import { useIssueGroupStore } from '@/store/issueGroupStore';
import { useSettingStore } from '@/store/settingsStore';
import { DevTimeWarningColor } from '@/lib/ColorMapping';
import { blue, grey } from '@mui/material/colors';

export type DateDropZoneType = {dateKey: string|number;  children: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }

export function DateDropZone({dateKey, children}: DateDropZoneType) {
  const {isOver, setNodeRef} = useDroppable({
    id: dateKey,
  });
  const style = {
    color: isOver ? blue['A200'] : undefined,
  };
  
  const {groupedIssues} = useIssueGroupStore()
  const settings = useSettingStore(state => state.settings)
  
  const totalDevHours = groupedIssues[dateKey]?.reduce((total, issue) => total + (parseInt(issue.dev_time) || 0), 0) || 0;
  let devHrWarning  = {}

  if(settings.weeklyHourLowerWarning && totalDevHours < settings.weeklyHourLowerWarning) {
    devHrWarning = DevTimeWarningColor['lower']
  }else if(settings.weeklyHourUpperWarning && totalDevHours > settings.weeklyHourUpperWarning) {
    devHrWarning = DevTimeWarningColor['upper']
  }


  return (
    <Paper ref={setNodeRef} style={style} 
      elevation={5}
      sx={{
        mr: 1,
        height: '100%',
        '&.MuiPaper-outlined': {
          borderColor: grey['A700']
        }
      }}
      variant='outlined'
    >
      <Container disableGutters 
        sx={{p: 1}}
      >
        <Typography fontSize={'1.2rem'} >
          {dateKey}

          <Chip label={`(${totalDevHours}H)`} component='span' 
             sx={{
                ml:1,
                ...devHrWarning
              }}
          />
        </Typography>
        {children}
      </Container>
    </Paper>
  );
}