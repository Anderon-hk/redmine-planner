// this componet is to check if any later versions issue due date is prior to the last due date of previous version's issues

import { Issue } from "@/lib/RedmineTyping";
import { useIssueWarningStore } from '@/store/issueWarningStore';
import { Card, Typography } from '@mui/material';


export default function CrossVersionDueDateWarning() {
    const crossDueDateCheck = useIssueWarningStore(state => state.crossDueDateCheck)

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