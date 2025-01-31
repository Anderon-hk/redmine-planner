import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Issue } from '@/lib/RedmineTyping';
import { Card, CardContent, Chip, Tooltip, Typography } from '@mui/material';
import { useIssuesStore } from '@/store/issuesStore';
import { PriorityColor, TrackerColor } from '@/lib/ColorMapping';
import { red } from '@mui/material/colors';

export type IssueCardProps = {
  children:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<React.AwaitedReactNode>
    | null
    | undefined;
  issueObject: Issue;
};

export function IssueCard({issueObject}: IssueCardProps) {
  const versions = useIssuesStore(state => state.versions)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id:issueObject.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card ref={setNodeRef} {...listeners} {...attributes} style={style} 
      elevation={12}
      sx={{
        margin:1
      }}
      raised
    >
      <CardContent >
        <Tooltip title={issueObject.description} >
          <Typography variant='subtitle1'  component='div'
            sx={{
              wordWrap: 'break-word'
            }}
          >
            {issueObject.subject}
          </Typography>
        </Tooltip>
        <Chip size='small' label={issueObject.priority} sx={{
          bgcolor: PriorityColor[issueObject.priority.toLocaleLowerCase()].bgColor,
          color: PriorityColor[issueObject.priority.toLocaleLowerCase()].color
          }} 
        />
        <Tooltip title={versions[issueObject.fixed_version] || ''} >
          <Chip size='small' label={issueObject.fixed_version} />
        </Tooltip>
        <Chip size='small' label={`${issueObject.dev_time}H`} />
        <Chip size='small' label={issueObject.tracker} 
          sx={{
            bgcolor: TrackerColor[issueObject.tracker.toLocaleLowerCase()].bgColor,
            color: TrackerColor[issueObject.tracker.toLocaleLowerCase()].color
          }}
        />
        <Chip size='small' label={issueObject.project} />
      </CardContent>
    </Card>
  );
}