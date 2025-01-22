import { Issue } from '@/lib/RedmineUtil';
import { Low, LowSync } from 'lowdb';
import { JSONFile, JSONFilePreset, JSONFileSync, JSONFileSyncPreset } from 'lowdb/node';
import { join } from 'path';
import { cwd } from 'process';

// export type Issue = {
//   id: number;
//   project: {
//     id: number;
//     name: string;
//   };
//   tracker: {
//     id: number;
//     name: string;
//   };
//   status: {
//     id: number;
//     name: string;
//   };
//   priority: {
//     id: number;
//     name: string;
//   };
//   author: {
//     id: number;
//     name: string;
//   };
//   assigned_to: {
//     id: number;
//     name: string;
//   };
//   fixed_version: {
//     id: number;
//     name: string;
//   };
//   subject: string;
//   description: string;
//   start_date: string;
//   due_date: string;
//   done_ratio: number;
//   custom_fields: Array<{
//     id: number;
//     name: string;
//     multiple?: boolean;
//     value: string | string[];
//   }>;
//   created_on: string;
//   updated_on: string;
//   estimated_hours: number;
// };

export type Data = {
  settings: {
    url: string;
    apiToken: string;
  },
  issues: Issue[];
}

const dbData : Data = {
  settings: {
    url: '',
    apiToken: '',
  },
  issues: [],
}

console.log('current dir', join(cwd(), 'db', 'db.json'));
let path = join(cwd(), 'db', 'db.json');

export const db = await JSONFilePreset<Data>(path, dbData);
