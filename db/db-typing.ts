import { Issue, Version } from '@/lib/RedmineTyping';

export type Data = {
  settings: {
    url: string;
    apiToken: string;
    redmineHost: string;
    weeklyHourUpperWarning?: number;
    weeklyHourLowerWarning?: number;
  },
  issues: Issue[];
  versions: Version;
}