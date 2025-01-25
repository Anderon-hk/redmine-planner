import { Issue } from '@/lib/RedmineTyping'
import { buildIssuesMap, getFieldValuesSet, getPriorityOrder, IssuePriorityComparator } from '@/lib/Utils'
import { useIssuesStore } from '@/store/issuesStore'
import { FilterOptions, query } from '@chronicstone/array-query'

export function PriorityDueDateWarning() {
  const {issues, issuesVersions} = useIssuesStore()
  const issuesByVersion = buildIssuesMap(issues, 'fixed_version')
  let priorityDueDateWarning:Set< {
    version: string,
    higherPriority: string,
    lowerPriority: string,
  }> = new Set()


  for(const version of issuesVersions){
    const issuesByPriority = buildIssuesMap(issuesByVersion[version], 'priority')
    const priorities = getFieldValuesSet(issuesByVersion[version], 'priority', IssuePriorityComparator)
    for(let i = 0; i < priorities.length; i++) {
      const curPriorityLastDueIssue = query(issuesByPriority[priorities[i]], {
        sort: {
          key: 'revised_due_date',
          dir: 'desc'
        }
      })[0];

      const toCheckPriorities = priorities.slice(i + 1)
     
      let toCheckIssues = query(issuesByVersion[version], {
        filter: [
          {
            operator: 'AND',
            filters: toCheckPriorities.map(pr => ({
              key: 'priority',
              matchMode: 'equals',
              value: pr,
            })) || [] 
          },
        ]
      })

      // further filter by due date
      toCheckIssues = query(toCheckIssues, {
        filter: [
          {
            key: 'revised_due_date',
            value: curPriorityLastDueIssue.revised_due_date,
            matchMode: 'greaterThan',
            params: {
              dateMode: true
            }
          }
        ]
      })

      if(toCheckIssues.length > 0) {
        toCheckIssues.forEach(issue => {
          priorityDueDateWarning.add({
            version: version,
            higherPriority: priorities[i],
            lowerPriority: toCheckIssues[0].priority,
          })
        })
      }

    }
  }
  console.log('PriorityDueDateWarning render')
  return (
    <div>
      <h2>Priority Due Date Warning</h2>
      {Array.from(priorityDueDateWarning).map(warn => (
        <div key={` ${warn.version}-${warn.higherPriority}-${warn.lowerPriority}`} >
          <p>{warn.version}: {warn.higherPriority} has a later due date than {warn.lowerPriority}</p>
        </div>
      ))}
    </div>
  )
}