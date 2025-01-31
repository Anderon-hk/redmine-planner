import { useSettingStore } from '@/store/settingsStore';
import Link from '@mui/material/Link';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const IssueNumberrenderer = (params: GridRenderCellParams<any, string>) => {
  const redmineHost = useSettingStore((state) => state.settings.redmineHost);
  const url = `${redmineHost}/issues/${params.value}`;
  return (
    <Link href={url} target='_blank' rel='noopener noreferrer' >
    {params.value}
    </Link>
  )
}