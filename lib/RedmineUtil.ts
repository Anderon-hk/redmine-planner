import { Issue, RawIssue } from './RedmineTyping';

export function transfromIssues (rawIssues: RawIssue[]): Issue[] {
  return rawIssues.map((rawIssue) => {
    return {
      id: rawIssue.id,
      project: rawIssue.project.name,
      tracker: rawIssue.tracker.name,
      status: rawIssue.status.name,
      priority: rawIssue.priority.name,
      author: rawIssue.author.name,
      assigned_to: rawIssue.assigned_to.name,
      fixed_version: rawIssue.fixed_version?.name || 'None',
      subject: rawIssue.subject,
      description: rawIssue.description,
      due_date: rawIssue.due_date,
      revised_due_date: rawIssue.due_date,
      done_ratio: rawIssue.done_ratio,
      updated_on: rawIssue.updated_on,
      created_on: rawIssue.created_on,
      estimated_hours: rawIssue?.estimated_hours || 0,
      // custom_fields
      site: (rawIssue.custom_fields.find(field => field.name === 'Site')?.value as string[])?.join(',') || '',
      dev_time: (rawIssue.custom_fields.find(field => field.name === 'Dev Time (Hr)')?.value as string) || '0',
      };
  });
}

export async function fetchIssuesFromRedmine(url: string, apiKey: string): Promise<RawIssue[]> {
  const response = await fetch(url, {
    headers: {
      'X-Redmine-API-Key': apiKey,
    },
  });
  const data = await response.json();
  return data.issues;
}