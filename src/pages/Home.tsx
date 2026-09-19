import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navItems } from '@/config/docs';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const validHrefs = navItems.flatMap((section) => section.items.map((item) => item.href));
    const lastVisited = localStorage.getItem('lastVisitedDoc');

    if (lastVisited && validHrefs.includes(lastVisited)) {
      navigate(lastVisited, { replace: true });
    } else {
      if (lastVisited) {
        localStorage.removeItem('lastVisitedDoc');
      }
      navigate('/docs/sorting-introduction', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="animate-pulse flex items-center gap-3 text-gray-500 font-medium text-sm">
        <div className="h-4 w-4 rounded-full bg-purple-600 border-2 border-white border-t-transparent animate-spin"></div>
        <span>Navigating to Documentation...</span>
      </div>
    </div>
  );
}
