import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import LinearProgress from '@mui/material/LinearProgress'
import type { Navigation } from '@toolpad/core/AppProvider';

import theme from '../theme';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Issues List',
  },
  {
    segment: 'issue-planner',
    title: 'Issue Planner',
  },
  {
    segment: 'modified-issues',
    title: 'Modified Issues',
  },
  {
    kind: 'page',
    title: 'Settings',
    segment: 'settings',
  }
];

const BRANDING = {
  title: 'Redmine Issue Planner',
};



export default function RootLayout(props: { children: React.ReactNode }) {
  

  return (
    <html lang="en" data-toolpad-color-scheme="dark" suppressHydrationWarning>
      <body>
        
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              theme={theme}
            >
              {props.children}
            </NextAppProvider>
            </React.Suspense>
          </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
