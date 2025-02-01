import { getDB } from '@/db/db';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  let db = await getDB()
  db.update(data => {
    data.issues = []
    data.versions = {}
    return data
  })

  let res = new Response(null, {
    status: 200
  })
  return res;
}