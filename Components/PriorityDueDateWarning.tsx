import { Issue } from '@/lib/RedmineTyping'
import { buildIssuesMap, getFieldValuesSet, getPriorityOrder, IssuePriorityComparator } from '@/lib/Utils'
import { useIssuesStore } from '@/store/issuesStore'
import { useIssueWarningStore } from '@/store/issueWarningStore'
import { FilterOptions, query } from '@chronicstone/array-query'
import { Card, Typography } from '@mui/material'

export function PriorityDueDateWarning() {
  // const {issues, issuesVersions} = useIssuesStore()
  // const issuesByVersion = buildIssuesMap(issues, 'fixed_version')
  const priorityDueDateWarnings = useIssueWarningStore(state => state.priorityDueDateWarnings)
  // let priorityDueDateWarningCheck:Set<string> = new Set()

  // let priorityDueDateWarnings: { 
  //   version: string,
  //   higherPriority: string,
  //   lowerPriority: string,
  // }[] = []


  // for(const version of issuesVersions){
  //   const issuesByPriority = buildIssuesMap(issuesByVersion[version], 'priority')
  //   const priorities = getFieldValuesSet(issuesByVersion[version], 'priority', IssuePriorityComparator)
  //   for(let i = 0; i < priorities.length; i++) {
  //     const curPriorityLastDueIssue = query(issuesByPriority[priorities[i]], {
  //       sort: {
  //         key: 'revised_due_date',
  //         dir: 'desc'
  //       }
  //     })[0];

  //     const toCheckPriorities = priorities.slice(i + 1)
     
  //     let toCheckIssues = query(issuesByVersion[version], {
  //       filter: [
  //         {
  //           operator: 'AND',
  //           filters: toCheckPriorities.map(pr => ({
  //             key: 'priority',
  //             matchMode: 'equals',
  //             value: pr,
  //           })) || [] 
  //         },
  //       ]
  //     })

  //     // further filter by due date
  //     toCheckIssues = query(toCheckIssues, {
  //       filter: [
  //         {
  //           key: 'revised_due_date',
  //           value: curPriorityLastDueIssue.revised_due_date,
  //           matchMode: 'greaterThan',
  //           params: {
  //             dateMode: true
  //           }
  //         }
  //       ]
  //     })

  //     if(toCheckIssues.length > 0) {
  //       toCheckIssues.forEach(issue => {
  //         const checkKey = `${version}-${priorities[i]}-${toCheckIssues[0].priority}`
  //         if(!priorityDueDateWarningCheck.has(checkKey)) {
  //           priorityDueDateWarningCheck.add(checkKey)
  //           priorityDueDateWarnings.push({
  //             version: version,
  //             higherPriority: priorities[i],
  //             lowerPriority: toCheckIssues[0].priority,
  //           })
  //         }
  //       })
  //     }

  //   }
  // }
  // console.log(priorityDueDateWarningCheck)
  // console.log('PriorityDueDateWarning render')
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