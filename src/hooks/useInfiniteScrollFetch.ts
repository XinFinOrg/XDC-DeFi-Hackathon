import { useEffect, useState } from 'react';

const isHalfScreenToBottom = () =>
  window.innerHeight + document.documentElement.scrollTop >=
  document.documentElement.offsetHeight - window.innerHeight / 2;

export default function useInfiniteScrollFetch(
  fetchMoreData: () => Promise<void>,
  fetchInitially = true,
  stopFetch = false,
): [boolean, () => void] {
  const [isFetching, setIsFetching] = useState(fetchInitially);

  const forceFetch = () => setIsFetching(true);

  useEffect(() => setIsFetching(fetchInitially), [fetchInitially]);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData().finally(() => setIsFetching(false));
  }, [isFetching]);

  useEffect(() => {
    function handleScroll() {
      if (isFetching || stopFetch || !isHalfScreenToBottom()) return;

      setIsFetching(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsFetching, isFetching, stopFetch]);

  return [isFetching, forceFetch];
}
