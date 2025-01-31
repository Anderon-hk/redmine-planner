// this componet is to check if any later versions issue due date is prior to the last due date of previous version's issues

import { Issue } from "@/lib/RedmineTyping";
import { buildIssuesMap, buildSortedFirstDueDateMap, IssuesByKeyMap } from "@/lib/Utils";
import { useIssuesStore } from "@/store/issuesStore";
import { useIssueWarningStore } from '@/store/issueWarningStore';
import { query } from '@chronicstone/array-query';
import { Card, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

function checkCrossDueDate(issuesByVersionEarliestDue: IssuesByKeyMap<'fixed_version'>, issuesByVersionLastDue: IssuesByKeyMap<'fixed_version'>, sortedVersions: Issue['fixed_version'][] ) {
    let crossedVersions : {preVer: Issue['fixed_version'], nextVer: Issue['fixed_version']}[] = [];
    for (let i = 0; i < sortedVersions.length - 1; i++) {
        const preVer = sortedVersions[i];
        const preVerLastDueDate = issuesByVersionLastDue[preVer]?.revised_due_date || null;

        for (let j = i + 1; j < sortedVersions.length; j++) {
            const nextVer = sortedVersions[j];
            const nextVerEarliestDueDate = issuesByVersionEarliestDue[nextVer]?.revised_due_date || null;

            if (preVerLastDueDate && nextVerEarliestDueDate && preVerLastDueDate > nextVerEarliestDueDate) {
                crossedVersions.push({preVer, nextVer});
            }
        }
    }
    return crossedVersions
}

export default function CrossVersionDueDateWarning() {
    // const {issues} = useIssuesStore()
    const crossDueDateCheck = useIssueWarningStore(state => state.crossDueDateCheck)
    // console.log('CrossVersionDueDateWarning crossDueDateCheck')
    // console.log(crossDueDateCheck)
    // const issuesByVersion = buildIssuesMap(issues, 'fixed_version')

    // const issuesByVersionEarliestDue = buildSortedFirstDueDateMap(issuesByVersion, 'asc')
    // const issuesByVersionLastDue = buildSortedFirstDueDateMap(issuesByVersion, 'desc')

    // const sortedVersions = Object.keys(issuesByVersion).sort()

    // const crossedVersions = checkCrossDueDate(issuesByVersionEarliestDue, issuesByVersionLastDue, sortedVersions)

    console.log('CrossVersionDueDateWarning render')
    if(crossDueDateCheck.length === 0) {
        return
    }

    return (
        <>
        {crossDueDateCheck.map(versionPair => (
            <Card key={`${versionPair['preVer']}-${versionPair['nextVer']}`} 
                sx={{
                    p: 2,
                    mt: 1
                }} 
            >
                <Typography variant='subtitle2' >{versionPair.preVer} has a later due date than {versionPair.nextVer}</Typography>
            </Card>
        ))}
        </>
    );

}