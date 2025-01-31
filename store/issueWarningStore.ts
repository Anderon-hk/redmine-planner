import { Issue } from '@/lib/RedmineTyping'
import { create } from 'zustand'

export type VersionsLastestDueDate = {
  version: string,
  versionDueDate: string | undefined
  latestDueDate: string,
  hasWarning: boolean,
}

export type CrossDueDateCheck = {
  preVer: Issue['fixed_version'], 
  nextVer: Issue['fixed_version']
}

export type PriorityDueDateWarning = {
  version: string,
  higherPriority: string,
  lowerPriority: string,
}

export type IssueWarningStore = {
  versionsLastestDueDate: VersionsLastestDueDate[]
  versionsLastestDueDateHasWarning: boolean
  crossDueDateCheck: CrossDueDateCheck[]
  priorityDueDateWarnings: PriorityDueDateWarning[]
  setVersionsLastestDueDate: (data: VersionsLastestDueDate[]) => void
  setCrossDueDateCheck: (data: CrossDueDateCheck[]) => void,
  setPriorityDueDateWarnings: (data: PriorityDueDateWarning[]) => void
}

export const issueWarningStore = create<IssueWarningStore>((set, get) => ({
  versionsLastestDueDate: [],
  versionsLastestDueDateHasWarning: false,
  crossDueDateCheck: [],
  priorityDueDateWarnings: [],
  setVersionsLastestDueDate: (data) => {
    let hasWarning = false;
    data.some(value => (value.hasWarning === true))
    set(state => ({
      ...state,
      versionsLastestDueDate: data,
      versionsLastestDueDateHasWarning: hasWarning
    }))
  },
  setCrossDueDateCheck: (data: CrossDueDateCheck[]) => {
    set(state => ({
      ...state,
      crossDueDateCheck: data
    }))
  },
  setPriorityDueDateWarnings: (data: PriorityDueDateWarning[]) => {
    set(state => ({
      ...state,
      priorityDueDateWarnings: data
    }))
  }
}))

export const useIssueWarningStore = issueWarningStore