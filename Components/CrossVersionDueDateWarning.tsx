// this componet is to check if any later versions issue due date is prior to the last due date of previous version's issues

import { Issue } from "@/lib/RedmineTyping";
import { buildIssuesMap, buildSortedFirstDueDateMap, IssuesByKeyMap } from "@/lib/Utils";
import { useIssuesStore } from "@/store/issuesStore";
import { query } from '@chronicstone/array-query';
import { useMemo } from 'react';

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
    const {issues} = useIssuesStore()

    // const issuesByVersion = buildIssuesMap(issues, 'fixed_version');

    const issuesByVersion = buildIssuesMap(issues, 'fixed_version')

    const issuesByVersionEarliestDue = buildSortedFirstDueDateMap(issuesByVersion, 'asc')
    const issuesByVersionLastDue = buildSortedFirstDueDateMap(issuesByVersion, 'desc')

    const sortedVersions = Object.keys(issuesByVersion).sort()

    const crossedVersions = checkCrossDueDate(issuesByVersionEarliestDue, issuesByVersionLastDue, sortedVersions)

    console.log('CrossVersionDueDateWarning render')
    if(crossedVersions.length === 0) {
        return
    }

    return (
        <div>
            <h2>Cross Version Due Date Warning</h2>
            <p>Issues with later versions due date prior to the last due date of previous version&apos;s issues:</p>
            <ul>
                {crossedVersions.map(versionPair => (
                    <li key={`${versionPair['preVer']}-${versionPair['nextVer']}`}>
                        {versionPair.nextVer} has a later due date than {versionPair.preVer}
                    </li>
                ))}
            </ul>
        </div>
    );

}