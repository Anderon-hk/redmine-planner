import { Issue } from '@/lib/RedmineTyping';
import { buildIssuesMap, buildMapByKey, getFieldValuesSet, issueVersionComparator } from '@/lib/Utils';
import { create } from 'zustand';


export const ISSUE_STORAGE_KEY = 'redmine_planner_issues';

type IssuesStore = {
  issues: Issue[];
  issuesVersions: Issue['fixed_version'][];
  setIssues: (issues: Issue[]) => void;
  addIssue: (issue: Issue) => void;
  removeIssue: (id: number) => void;
  fetchIssues: () => Promise<void>;
  buildIssuesVersions: () => void;
};

export const getInitialIssues = (): Issue[] => {
  // return [];
  const storedIssues = localStorage?.getItem(ISSUE_STORAGE_KEY);
  return storedIssues ? JSON.parse(storedIssues) : [];
};

export const getInitialIssuesVersions = (): Issue['fixed_version'][] => {
  const issues = getInitialIssues();
  return getFieldValuesSet(issues, 'fixed_version', issueVersionComparator);
}

//merge data from backend to avoid updated revies date
export function mergeIssues(localIssues: Issue[], remoteIssues: Issue[]): Issue[] {
  
  const localIssuesMap = buildMapByKey(localIssues, 'id');

  const updatedRemoteIssues = remoteIssues.map((remoteIssue) => {
    const localIssue = localIssuesMap[remoteIssue.id];
    // remote due date = local due date => no changes, safe to keep local one
    if (localIssue && remoteIssue.due_date === localIssue.due_date) {
      remoteIssue.revised_due_date = localIssue.revised_due_date;

    }
    return remoteIssue;
  });

  return updatedRemoteIssues;
}


export const useIssuesStore = create<IssuesStore>((set, get) => ({
  issues: (() => (getInitialIssues()))(),
  issuesVersions: (()=> (getInitialIssuesVersions()))(),
  setIssues: (issues) => {
    localStorage.setItem(ISSUE_STORAGE_KEY, JSON.stringify(issues));
    set({ issues });
    get().buildIssuesVersions()
  },
  addIssue: (issue) => set((state) => {
    const updatedIssues = [...state.issues, issue];
    localStorage.setItem(ISSUE_STORAGE_KEY, JSON.stringify(updatedIssues));
    return { issues: updatedIssues };
  }),
  removeIssue: (id) => set((state) => {
    const updatedIssues = state.issues.filter(issue => issue.id !== id);
    localStorage.setItem(ISSUE_STORAGE_KEY, JSON.stringify(updatedIssues));
    return { issues: updatedIssues };
  }),
  fetchIssues: async () => {
    const response = await fetch('/api/issues');
    const data = await response.json();
    const {issues: localIssues} = get()
    const finalIssues = mergeIssues(localIssues, data)
    set({ issues: finalIssues });
    localStorage.setItem(ISSUE_STORAGE_KEY, JSON.stringify(data));
  },
  buildIssuesVersions: () => {
    const issues = get().issues;
    const issuesVersions = getFieldValuesSet(issues, 'fixed_version', issueVersionComparator);
    set({issuesVersions: issuesVersions});
  }
}));
