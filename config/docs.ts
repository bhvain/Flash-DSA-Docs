import { FileText, Code, Database, Layout, Calculator, Plus, Trash2, Search } from 'lucide-react';

export const navItems = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction & Memory', href: '/docs/introduction', icon: FileText, active: true },
    ]
  },
  {
    title: 'Complexity Analysis',
    items: [
      { title: 'Time Complexity', href: '/docs/time-complexity', icon: Code, active: true },
      { title: 'Asymptotic Notations', href: '/docs/asymptotic-notations', icon: Layout, active: true },
      { title: 'Algorithm Cases & Log', href: '/docs/cases-and-log', icon: FileText, active: true },
      { title: 'Practice Problems', href: '/docs/time-complexity-practice', icon: Calculator, active: true },
    ]
  },
  {
    title: 'Arrays',
    items: [
      { title: 'Arrays & ADT', href: '/docs/arrays-adt', icon: Layout, active: true },
      { title: 'Array Operations', href: '/docs/array-operations', icon: Code, active: true },
      { title: 'Array Insertion', href: '/docs/array-insertion', icon: Plus, active: true },
      { title: 'Array Deletion', href: '/docs/array-deletion', icon: Trash2, active: true },
      { title: 'Linear & Binary Search', href: '/docs/linear-binary-search', icon: Search, active: true },
    ]
  },
  {
    title: 'Linked Lists',
    items: [
      { title: 'Introduction', href: '/docs/linked-lists', icon: Database, active: true },
      { title: 'Creation & Traversal', href: '/docs/linked-list-traversal', icon: Code, active: true },
      { title: 'Insertion Concepts', href: '/docs/linked-list-insertion', icon: Plus, active: true },
      { title: 'Insertion Code', href: '/docs/linked-list-insertion-code', icon: Code, active: true },
      { title: 'Deletion Concepts', href: '/docs/linked-list-deletion', icon: Trash2, active: true },
      { title: 'Deletion Code', href: '/docs/linked-list-deletion-code', icon: Code, active: true },
    ]
  }
];
