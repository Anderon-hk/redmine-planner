import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      defaultSidebarCollapsed
    >
      <PageContainer
        maxWidth={false}
        disableGutters
        sx={{
          pl: 5,
          pr: 5
        }}
      >
        {props.children}
      </PageContainer>
    </DashboardLayout>
  );
}  
