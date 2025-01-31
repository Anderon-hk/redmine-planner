export type RawIssue = {
  id: number;
  project: {
    id: number;
    name: string;
  };
  tracker: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
  priority: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
  };
  assigned_to: {
    id: number;
    name: string;
  };
  fixed_version?: {
    id: number;
    name: string;
  };
  subject: string;
  description: string;
  start_date: string;
  due_date: string;
  done_ratio: number;
  custom_fields: Array<{
    id: number;
    name: string;
    multiple?: boolean;
    value: string | string[];
  }>;
  created_on: string;
  updated_on: string;
  estimated_hours?: number;
};

export type Issue = {
  id: number;
  project: string;
  tracker: string;
  status: string;
  priority: string;
  author: string;
  assigned_to: string;
  fixed_version: string;
  subject: string;
  description: string;
  due_date: string;
  done_ratio: number;
  updated_on: string;
  created_on: string;
  estimated_hours: number;
  // custom_fields
  site: string
  dev_time: string;
  revised_due_date: string;
}


export type RawVersion = {
  id: number;
  project: {
      id: number,
      name: string
  };
  name: string;
  description: string;
  status: string;
  due_date: string;
  sharing: string;
  created_on: string;
  updated_on: string;
}


export type Version = Record<RawVersion['name'], RawVersion['due_date']>;