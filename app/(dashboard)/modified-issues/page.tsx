'use client';
import dynamic from 'next/dynamic';

const IssuesListContainer = dynamic(() => import('@/Components/IssueListDiffContainer'), {
  ssr: false
});

const IssuesListPage = () => {
  return (
    <>
      <IssuesListContainer />
    </>
  )
};

export default IssuesListPage;
