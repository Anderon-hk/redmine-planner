"use server"

import { Data, db } from './db';

export async function updateSettings(data: Data['settings']) {
  db.data.settings = data;
  db.update((dbData) => dbData.settings = data);
}