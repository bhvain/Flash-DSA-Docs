'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const lastVisited = localStorage.getItem('lastVisitedDoc');
    if (lastVisited) {
      router.replace(lastVisited);
    } else {
      router.replace('/docs/introduction');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="animate-pulse flex items-center gap-2 text-gray-500">
        <div className="h-4 w-4 rounded-full bg-blue-600"></div>
        <span>Loading...</span>
      </div>
    </div>
  );
}
