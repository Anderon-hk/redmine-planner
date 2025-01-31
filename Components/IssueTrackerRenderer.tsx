import { TrackerColor } from '@/lib/ColorMapping';
import { Chip, SxProps } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const IssueTrackerRenderer = (params: GridRenderCellParams<any, string>) => {
  let colorMapping = TrackerColor[params.value?.toLocaleLowerCase()];
  let chipSx: SxProps = {}
  if(colorMapping) {
    chipSx = {
      bgcolor: colorMapping.bgColor,
      color: colorMapping.color,
    }
  }
  return (
    <Chip label={params.value} size='small'
      sx={chipSx}
    />
  )
}