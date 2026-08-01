'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function TrackLocation() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/docs')) {
      localStorage.setItem('lastVisitedDoc', pathname);
    }
  }, [pathname]);

  return null;
}
