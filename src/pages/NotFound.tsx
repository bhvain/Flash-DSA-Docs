import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center shadow-lg">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight mb-2">
          Page Not Found
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
          The requested documentation topic or page does not exist or may have been moved.
        </p>
        <div className="flex flex-col gap-2.5">
          <Link
            to="/docs/sorting-introduction"
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Go to Documentation</span>
          </Link>
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-xs rounded-xl transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
