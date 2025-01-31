import { Issue } from '@/lib/RedmineTyping'
import { create } from 'zustand'

export type GroupedIssues = {
  [key: string]: Issue[]
}

export type IssueGroupStore = {
  groupedIssues: GroupedIssues
  setGroupedIssues: (issues: Issue[]) => void
}

export const useIssueGroupStore = create<IssueGroupStore>((set) => ({
  groupedIssues: {},
  setGroupedIssues: (issues) => {
    const grouped = issues.reduce((acc, issue) => {
      const key = issue.revised_due_date
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(issue)
      return acc
    }, {} as GroupedIssues)
    set({ groupedIssues: grouped })
  },
}))

export const issueGroupStore = useIssueGroupStore