import { Issue, Version } from '@/lib/RedmineTyping';
import { buildMapByKey, getFieldValuesSet, issueVersionComparator } from '@/lib/Utils';
import { create } from 'zustand';


export const ISSUE_STORAGE_KEY = 'redmine_planner_issues';
export const VERSION_STORAGE_KEY = 'redmine_planner_issues_versions';

type IssuesStore = {
  issues: Issue[];
  issuesVersions: Issue['fixed_version'][];
  versions: Version;
  setIssues: (issues: Issue[]) => void;
  addIssue: (issue: Issue) => void;
  removeIssue: (id: number) => void;
  fetchIssues: () => Promise<void>;
  buildIssuesVersions: () => void;
  setVersions: (versions: Version) => void;
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

const getInitialVersions = (): Version => {
  const storedVersions = localStorage?.getItem(VERSION_STORAGE_KEY);
  return storedVersions ? JSON.parse(storedVersions) : {};
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
  versions: (() => (getInitialVersions()))(),
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
    const {issues, versions} = await response.json();
    const {issues: localIssues, setVersions} = get()
    const finalIssues = mergeIssues(localIssues, issues)
    set({ issues: finalIssues });
    localStorage.setItem(ISSUE_STORAGE_KEY, JSON.stringify(issues));
    setVersions(versions);
  },
  buildIssuesVersions: () => {
    const issues = get().issues;
    const issuesVersions = getFieldValuesSet(issues, 'fixed_version', issueVersionComparator);
    set({issuesVersions: issuesVersions});
  },
  setVersions: (versions: Version) => {
    let newVersion: Version = {}
    Object.keys(versions).forEach(ver => {
      newVersion[ver] = versions[ver]
    })
    localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(newVersion));
    set({versions: newVersion});
  }
}));

export const issueStore = useIssuesStore