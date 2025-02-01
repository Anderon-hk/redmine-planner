"use server"

import { getDB } from './db';
import { Data } from './db-typing';

export async function updateSettings(data: Data['settings']) {
  const db = await getDB();
  db.data.settings = data;
  db.update((dbData) => dbData.settings = data);
}