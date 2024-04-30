import { useRouter } from 'next/router';
import React from 'react';

import AsyncBoundary from '@/components/common/AsyncBoundary/AsyncBoundary';
import PostSearch from '@/components/layout/Main/PostSearch';

function SearchPage() {
  const router = useRouter();
  const { search } = router.query;
  const searchString = typeof search === 'string' ? search : Array.isArray(search) ? search[0] : '';
  return (
    <AsyncBoundary>
      <PostSearch search={searchString} />
    </AsyncBoundary>
  );
}

export default SearchPage;
