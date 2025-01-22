import { db } from '@/db/db';
import { fetchIssuesFromRedmine, transfromIssues } from '@/lib/RedmineUtil';
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  let dbIssues = db.data.issues;
  if(dbIssues && dbIssues.length > 0) {
    return Response.json(dbIssues);
  }

  console.log('Fetching issues from Redmine');
  let redmineData = [
    {
      "id": 50249,
      "project": {
        "id": 39,
        "name": "GHK Production"
      },
      "tracker": {
        "id": 1,
        "name": "Bug"
      },
      "status": {
        "id": 18,
        "name": "Completed UAT"
      },
      "priority": {
        "id": 6,
        "name": "Urgent"
      },
      "author": {
        "id": 473,
        "name": "Jack Li"
      },
      "assigned_to": {
        "id": 443,
        "name": "Anderson Tam"
      },
      "fixed_version": {
        "id": 532,
        "name": "HMS Common - v7.11.0"
      },
      "subject": "GHW SVI on 5 Jan 2025 - Wrong Department Code",
      "description": "Case No: GHW2412003728\r\nInvoice No.: OP01246437\r\nBill Payer: PMSA012 - BUPA (ASIA) LIMITED\r\n\r\nPlease check why \"Department Code\" are BODAD for SVI item?\r\nExpected to show \"GHWSC\"\r\n\r\n!picture552-1.png!",
      "start_date": "2025-01-06",
      "due_date": "2025-01-17",
      "done_ratio": 100,
      "custom_fields": [
        {
          "id": 36,
          "name": "Site",
          "multiple": true,
          "value": ["Prod"]
        },
        {
          "id": 2,
          "name": "HMS Sub Module",
          "value": "Billing and Invoice"
        },
        {
          "id": 10,
          "name": "Report By",
          "value": "Jack (Fin Serena)"
        },
        {
          "id": 40,
          "name": "Reported in Urgent Group",
          "value": "0"
        },
        {
          "id": 46,
          "name": "Expected System Behaviour",
          "value": "no bug."
        },
        {
          "id": 53,
          "name": "Proposed Target Version",
          "value": ""
        },
        {
          "id": 32,
          "name": "Revised Target Version",
          "value": ""
        },
        {
          "id": 31,
          "name": "Handled By (Mobigator's use)",
          "value": "443"
        },
        {
          "id": 30,
          "name": "Dev Time (Hr)",
          "value": "0"
        },
        {
          "id": 63,
          "name": "SLA Priority",
          "value": "Not Applicable"
        },
        {
          "id": 22,
          "name": "QA - Test Case (Kiwi)",
          "value": "N/A"
        },
        {
          "id": 72,
          "name": "QA - Root Cause",
          "value": "Legacy Coding Issues"
        },
        {
          "id": 34,
          "name": "QA - Resolution",
          "value": "Code Changes"
        },
        {
          "id": 73,
          "name": "QA - Prevention",
          "value": "Other"
        },
        {
          "id": 74,
          "name": "QA - Caused By (Ticket #)",
          "value": "0"
        }
      ],
      "created_on": "2025-01-06T03:16:00Z",
      "updated_on": "2025-01-17T07:05:04Z"
    },
    {
      "id": 50156,
      "project": {
        "id": 39,
        "name": "GHK Production"
      },
      "tracker": {
        "id": 2,
        "name": "Feature"
      },
      "status": {
        "id": 4,
        "name": "Pending MTG Feedback"
      },
      "priority": {
        "id": 5,
        "name": "High"
      },
      "author": {
        "id": 334,
        "name": "John Kwok"
      },
      "assigned_to": {
        "id": 443,
        "name": "Anderson Tam"
      },
      "fixed_version": {
        "id": 566,
        "name": "HMS Common - v7.10.0"
      },
      "subject": "[SVI] Updates on Doctor Code Format",
      "description": "*0. Background*\r\nCurrently, from #31201, the SVI module in HMS support two kinds of doctor code\r\n- the doctor code is 8 characters (e.g. M15000RM) => subString(6, 8) (RN) \r\n- the doctor code is 11 characters (e.g. M15369HFHKU) => subString(8, 11) (HKU)\r\n\r\nthe code will then be used to look for department code in doctor_dept_code\r\n\r\n*1. Purpose/ Description*\r\nUser would like to enhance this feature by supporting dr code with varying characters.\r\n\r\n*2. Use case*\r\nNo workflow changes, but doctor item is now support dr code with varying characters.\r\n\r\n*3. Mock-Up*\r\nM12345NSHKU -> SMOAD\r\nM15369HFHKU -> SMOAD\r\nM15333RMOOH -> RMOAD\r\nM12098VXGMC -> RMOAD\r\nM14848VS000 -> \"Blank\"\r\n\r\n\r\n*4. Functional Requirements*\r\nThe implementation logic is as below:\r\n1. check if the length >= 3, if no return \"Blank\"\r\n2. get the suffix (3 characters) from the doctor code\r\n3. get all doctor_dept_code, check if suffix include the doctor_dept_code\r\n4. if so, assign the corresponding dr code, else return \"Blank\"\r\n\r\n\r\n*5. Field Level Specifications*\r\nN/A",
      "start_date": "2024-12-30",
      "due_date": "2025-02-07",
      "done_ratio": 0,
      "estimated_hours": 8.0,
      "custom_fields": [
        {
          "id": 36,
          "name": "Site",
          "multiple": true,
          "value": ["Prod"]
        },
        {
          "id": 2,
          "name": "HMS Sub Module",
          "value": "Billing and Invoice"
        },
        {
          "id": 10,
          "name": "Report By",
          "value": "John Kwok"
        },
        {
          "id": 40,
          "name": "Reported in Urgent Group",
          "value": "0"
        },
        {
          "id": 53,
          "name": "Proposed Target Version",
          "value": ""
        },
        {
          "id": 32,
          "name": "Revised Target Version",
          "value": ""
        },
        {
          "id": 31,
          "name": "Handled By (Mobigator's use)",
          "value": "443"
        },
        {
          "id": 30,
          "name": "Dev Time (Hr)",
          "value": "4"
        },
        {
          "id": 22,
          "name": "QA - Test Case (Kiwi)",
          "value": ""
        }
      ],
      "created_on": "2024-12-30T09:32:21Z",
      "updated_on": "2025-01-17T07:24:03Z"
    },
    {
      "id": 50081,
      "project": {
        "id": 39,
        "name": "GHK Production"
      },
      "tracker": {
        "id": 2,
        "name": "Feature"
      },
      "status": {
        "id": 1,
        "name": "New"
      },
      "priority": {
        "id": 5,
        "name": "High"
      },
      "author": {
        "id": 183,
        "name": "Ka Sin Shiu"
      },
      "assigned_to": {
        "id": 443,
        "name": "Anderson Tam"
      },
      "subject": "Seller Order Enhancement -- Download Invoice ",
      "description": "1. Allow searchable of \"Invoice No\" (e.g., ASP00002357)\r\n\r\n2. New button <Print Invoice> to generate invoice PDF only, allow to download the PDF, named as \"DSP_17156_PO_\" with Invoice No (e.g., DSP_17156_PO_ASP00002357)\r\n\r\n!picture160-3.png!\r\n\r\n!picture160-1.png!\r\n\r\n!picture160-2.png!",
      "start_date": "2024-12-24",
      "due_date": "2025-01-24",
      "done_ratio": 0,
      "custom_fields": [
        {
          "id": 36,
          "name": "Site",
          "multiple": true,
          "value": ["Prod"]
        },
        {
          "id": 2,
          "name": "HMS Sub Module",
          "value": "Seller"
        },
        {
          "id": 10,
          "name": "Report By",
          "value": "Kasin (Pharmacy MK)"
        },
        {
          "id": 40,
          "name": "Reported in Urgent Group",
          "value": "0"
        },
        {
          "id": 53,
          "name": "Proposed Target Version",
          "value": "566"
        },
        {
          "id": 32,
          "name": "Revised Target Version",
          "value": ""
        },
        {
          "id": 31,
          "name": "Handled By (Mobigator's use)",
          "value": "443"
        },
        {
          "id": 30,
          "name": "Dev Time (Hr)",
          "value": "1"
        },
        {
          "id": 22,
          "name": "QA - Test Case (Kiwi)",
          "value": ""
        }
      ],
      "created_on": "2024-12-24T02:42:49Z",
      "updated_on": "2025-01-14T07:28:58Z"
    },
    {
      "id": 49952,
      "project": {
        "id": 39,
        "name": "GHK Production"
      },
      "tracker": {
        "id": 2,
        "name": "Feature"
      },
      "status": {
        "id": 1,
        "name": "New"
      },
      "priority": {
        "id": 4,
        "name": "Normal"
      },
      "author": {
        "id": 334,
        "name": "John Kwok"
      },
      "assigned_to": {
        "id": 443,
        "name": "Anderson Tam"
      },
      "fixed_version": {
        "id": 566,
        "name": "HMS Common - v8.0.0"
      },
      "subject": "Auto-Bill changes the last modified by to system",
      "description": "",
      "start_date": "2024-12-18",
      "due_date": "2025-01-31",
      "done_ratio": 0,
      "custom_fields": [
        {
          "id": 36,
          "name": "Site",
          "multiple": true,
          "value": ["Prod"]
        },
        {
          "id": 2,
          "name": "HMS Sub Module",
          "value": "Billing and Invoice"
        },
        {
          "id": 10,
          "name": "Report By",
          "value": "Ka Sin Shiu"
        },
        {
          "id": 40,
          "name": "Reported in Urgent Group",
          "value": "0"
        },
        {
          "id": 53,
          "name": "Proposed Target Version",
          "value": ""
        },
        {
          "id": 32,
          "name": "Revised Target Version",
          "value": ""
        },
        {
          "id": 31,
          "name": "Handled By (Mobigator's use)",
          "value": "443"
        },
        {
          "id": 30,
          "name": "Dev Time (Hr)",
          "value": "1"
        },
        {
          "id": 22,
          "name": "QA - Test Case (Kiwi)",
          "value": ""
        }
      ],
      "created_on": "2024-12-18T06:26:35Z",
      "updated_on": "2025-01-17T07:23:42Z"
    },
  ]

  // let redmineData = await fetchIssuesFromRedmine(db.data.settings.url, db.data.settings.apiToken);
  let formattedData = transfromIssues(redmineData);
  
  db.update(data => {
    data.issues = formattedData;
    return data;
  })

  return Response.json(formattedData);
}