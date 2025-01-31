import { useIssueWarningStore } from '@/store/issueWarningStore'
import { Card, Typography } from '@mui/material'

export function PriorityDueDateWarning() {
  const priorityDueDateWarnings = useIssueWarningStore(state => state.priorityDueDateWarnings)
  return (
    <>
      {priorityDueDateWarnings.map(warn => (
        <Card key={` ${warn.version}-${warn.higherPriority}-${warn.lowerPriority}`}
          sx={{
            p: 2,
            mt: 1
          }} 
        >
          <Typography variant='subtitle2'>
          {warn.version}: {warn.higherPriority} has a later due date than {warn.lowerPriority}
          </Typography>
        </Card>
      ))}
    </>
  )
}