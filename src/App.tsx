import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { CopyInterceptor } from './components/CopyInterceptor';
import { TrackLocation } from './components/TrackLocation';
import DocLayoutContainer from './components/DocLayoutContainer';

import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

import SortingIntroductionPage from './pages/docs/SortingIntroduction';
import SortingAnalysisCriteriaPage from './pages/docs/SortingAnalysisCriteria';
import BubbleSortPage from './pages/docs/BubbleSort';
import BubbleSortCodePage from './pages/docs/BubbleSortCode';
import InsertionSortPage from './pages/docs/InsertionSort';
import InsertionSortCodePage from './pages/docs/InsertionSortCode';
import SelectionSortPage from './pages/docs/SelectionSort';
import SelectionSortCodePage from './pages/docs/SelectionSortCode';
import QuickSortPage from './pages/docs/QuickSort';
import QuickSortCodePage from './pages/docs/QuickSortCode';
import QuickSortAnalysisPage from './pages/docs/QuickSortAnalysis';
import MergeSortPage from './pages/docs/MergeSort';
import MergeSortCodePage from './pages/docs/MergeSortCode';
import CountSortPage from './pages/docs/CountSort';
import CountSortCodePage from './pages/docs/CountSortCode';

function DocsShell() {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950 font-sans transition-colors overflow-hidden">
      <DocLayoutContainer>
        <Outlet />
      </DocLayoutContainer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CopyInterceptor />
      <BrowserRouter>
        <TrackLocation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<Navigate to="/docs/sorting-introduction" replace />} />
          
          <Route element={<DocsShell />}>
            <Route path="/docs/sorting-introduction" element={<SortingIntroductionPage />} />
            <Route path="/docs/sorting-analysis-criteria" element={<SortingAnalysisCriteriaPage />} />
            <Route path="/docs/bubble-sort" element={<BubbleSortPage />} />
            <Route path="/docs/bubble-sort-code" element={<BubbleSortCodePage />} />
            <Route path="/docs/insertion-sort" element={<InsertionSortPage />} />
            <Route path="/docs/insertion-sort-code" element={<InsertionSortCodePage />} />
            <Route path="/docs/selection-sort" element={<SelectionSortPage />} />
            <Route path="/docs/selection-sort-code" element={<SelectionSortCodePage />} />
            <Route path="/docs/quick-sort" element={<QuickSortPage />} />
            <Route path="/docs/quick-sort-code" element={<QuickSortCodePage />} />
            <Route path="/docs/quick-sort-analysis" element={<QuickSortAnalysisPage />} />
            <Route path="/docs/merge-sort" element={<MergeSortPage />} />
            <Route path="/docs/merge-sort-code" element={<MergeSortCodePage />} />
            <Route path="/docs/count-sort" element={<CountSortPage />} />
            <Route path="/docs/count-sort-code" element={<CountSortCodePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
