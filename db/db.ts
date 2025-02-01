'use server'
import { JSONFilePreset } from 'lowdb/node';
import { join } from 'path';
import { cwd } from 'process';
import { Data } from './db-typing';


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


// export const db = await JSONFilePreset<Data>(path, dbData);

export async function getDB() {
  console.log('current dir', join(cwd(), 'db', 'db.json'));
  let path = join(cwd(), 'db', 'db.json');
  const db = await JSONFilePreset<Data>(path, dbData);
  return db;
}