'use client';

import dynamic from 'next/dynamic';

const IssuePlannerContainer = dynamic(() => import('@/Components/IssuePlannerContainer'), {
  ssr: false
});

export default function IssuePlannerPage() {
  return <IssuePlannerContainer />
}