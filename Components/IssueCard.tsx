import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Issue } from '@/lib/RedmineTyping';
import { Card, CardContent, Chip, Link, Tooltip, Typography } from '@mui/material';
import { useIssuesStore } from '@/store/issuesStore';
import { PriorityColor, TrackerColor } from '@/lib/ColorMapping';
import { useSettingStore } from '@/store/settingsStore';

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
  const redmineHost = useSettingStore((state) => state.settings.redmineHost);
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
            <Link href={`${redmineHost}/issues/${issueObject.id}`} 
              target='_blank' rel='noopener noreferrer'
              underline='none'
              variant='inherit'
              color='textPrimary'
            >
              {issueObject.subject}
            </Link>
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
        <Chip size='small' label={issueObject.status} />
      </CardContent>
    </Card>
  );
}