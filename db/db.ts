import { Issue, Version } from '@/lib/RedmineTyping';
import { JSONFilePreset } from 'lowdb/node';
import { join } from 'path';
import { cwd } from 'process';


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

const dbData : Data = {
  settings: {
    url: '',
    apiToken: '',
    redmineHost: '',
    weeklyHourLowerWarning: undefined,
    weeklyHourUpperWarning: undefined
  },
  issues: [],
  versions: {}
}

console.log('current dir', join(cwd(), 'db', 'db.json'));
let path = join(cwd(), 'db', 'db.json');

export const db = await JSONFilePreset<Data>(path, dbData);
