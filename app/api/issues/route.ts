import { db } from '@/db/db';
import { fetchIssuesFromRedmine, fetchVersion, fetchVersions, transfromIssues } from '@/lib/RedmineUtil';
import { Dvr } from '@mui/icons-material';
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  let dbIssues = db.data.issues;
  if(dbIssues && dbIssues.length > 0) {
    return Response.json({
      issues: dbIssues,
      versions: db.data.versions
    });
  }


  let redmineData = await fetchIssuesFromRedmine(db.data.settings.url, db.data.settings.apiToken)

  let versionsData = await fetchVersions(redmineData);

  // let redmineData = await fetchIssuesFromRedmine(db.data.settings.url, db.data.settings.apiToken);
  let formattedData = transfromIssues(redmineData);
  
  db.update(data => {
    data.issues = formattedData;
    data.versions = versionsData;
    return data;
  })
 
  return Response.json({
    issues:   formattedData,
    versions: versionsData
  });
}