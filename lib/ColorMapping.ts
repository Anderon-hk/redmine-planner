'use client'

import { amber, blue, brown, deepOrange, green, grey, orange, pink, purple, red, yellow } from '@mui/material/colors'
import { Issue } from './RedmineTyping'

export const PriorityColor: Record<Issue['priority'], {bgColor: string, color: string}> = {
  'immediate': {
    bgColor: red[500],
    color: 'fff'
  },
  'urgent': {
    bgColor: deepOrange[500],
    color: 'eee'
  },
  'high': {
    bgColor: orange[500],
    color: grey[900]
  },
  'normal': {
    bgColor: yellow[500],
    color: grey[900]
  },
  'low': {
    bgColor: blue[500],
    color: grey[50]
  },
}

export const TrackerColor: Record<Issue['tracker'], {bgColor: string, color: string}> = {
  'feature': {
    bgColor: purple['A100'],
    color: grey['900']
  },
  'bug': {
    bgColor: red['A400'],
    color: grey['200']
  },
  'system support': {
    bgColor: amber['A200'],
    color: grey['800']
  },
  'operational support': {
    bgColor: yellow['A200'],
    color: grey['800']
  },
  'others': {
    bgColor: brown['A400'],
    color: grey['A700']
  }
}

export const DevTimeWarningColor: Record<'upper'|'lower', {bgcolor: string, color: string}> = {
  lower: {
    bgcolor: pink['A100'],
    color: grey['900']
  },
  upper: {
    bgcolor: deepOrange['A700'],
    color: grey['A200']
  }
}