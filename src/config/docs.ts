import { FileText, Code, Database, Layout, Calculator, Plus, Trash2, Search, RefreshCw, ArrowLeftRight, Layers, Eye, CheckCircle2, Users, Scale, GitFork } from 'lucide-react';

export const navItems = [
  {
    title: 'Algorithms',
    items: [
      { title: 'Sorting Introduction', href: '/docs/sorting-introduction', icon: ArrowLeftRight, active: true },
      { title: 'Analysis Criteria', href: '/docs/sorting-analysis-criteria', icon: Layout, active: true },
      { title: 'Bubble Sort Theory', href: '/docs/bubble-sort', icon: Layout, active: true },
      { title: 'Bubble Sort Code', href: '/docs/bubble-sort-code', icon: Code, active: true },
      { title: 'Insertion Sort Theory', href: '/docs/insertion-sort', icon: Layout, active: true },
      { title: 'Insertion Sort Code', href: '/docs/insertion-sort-code', icon: Code, active: true },
      { title: 'Selection Sort Theory', href: '/docs/selection-sort', icon: Layout, active: true },
      { title: 'Selection Sort Code', href: '/docs/selection-sort-code', icon: Code, active: true },
      { title: 'QuickSort Theory', href: '/docs/quick-sort', icon: Layout, active: true },
      { title: 'QuickSort Code', href: '/docs/quick-sort-code', icon: Code, active: true },
      { title: 'QuickSort Analysis', href: '/docs/quick-sort-analysis', icon: Scale, active: true },
      { title: 'Merge Sort Theory', href: '/docs/merge-sort', icon: GitFork, active: true },
      { title: 'Merge Sort Code', href: '/docs/merge-sort-code', icon: Code, active: true },
      { title: 'Count Sort Theory', href: '/docs/count-sort', icon: Calculator, active: true },
      { title: 'Count Sort Code', href: '/docs/count-sort-code', icon: Code, active: true },
    ]
  }
];

