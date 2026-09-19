import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function TrackLocation() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname?.startsWith('/docs')) {
      localStorage.setItem('lastVisitedDoc', pathname);
    }
  }, [pathname]);

  return null;
}
