import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Issue } from '@/lib/RedmineTyping';
import { Card, CardContent, Chip, Tooltip, Typography } from '@mui/material';

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
      elevation={5}
      sx={{
        margin:1
      }}
      raised
    >
      <CardContent >
        <Tooltip title={issueObject.description} >
          <Typography variant='subtitle1' >{issueObject.subject}</Typography>
        </Tooltip>
        <Chip size='small' label={issueObject.priority} />
        <Chip size='small' label={issueObject.fixed_version} />
        <Chip size='small' label={`${issueObject.dev_time}H`} />
        <Chip size='small' label={issueObject.tracker} />
        <Chip size='small' label={issueObject.project} />
      </CardContent>
    </Card>
  );
}