// this componet is to check if any later versions issue due date is prior to the last due date of previous version's issues

import { Issue } from "@/lib/RedmineTyping";
import { buildIssuesMap, buildSortedFirstDueDateMap } from "@/lib/Utils";
import { useIssuesStore } from "@/store/issuesStore";

function checkCrossDueDate(issuesByVersionEarliestDue: Map<string, Issue>, issuesByVersionLastDue: Map<string, Issue>, sortedVersions: Issue['fixed_version'][] ) {
    let crossedVersions = [];
    for(let i = 0; i < sortedVersions.length - 1; i++) {
        const preVer = sortedVersions[i]
        const nextVer = sortedVersions[i+1]
        if(issuesByVersionLastDue[preVer].revised_due_date > issuesByVersionEarliestDue[nextVer].revised_due_date) {
            crossedVersions.push(nextVer)
        }
    }
    return crossedVersions
}

export default function CrossVersionDueDateWarning() {
    const {issues} = useIssuesStore()
    const issuesByVersion = buildIssuesMap(issues, 'fixed_version');

    const issuesByVersionEarliestDue = buildSortedFirstDueDateMap(issuesByVersion, 'asc')
    const issuesByVersionLastDue = buildSortedFirstDueDateMap(issuesByVersion, 'desc')

    const sortedVersions = Object.keys(issuesByVersion).sort();

}