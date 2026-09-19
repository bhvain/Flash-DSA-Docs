import { 
  ArrowLeftRight, 
  HelpCircle, 
  Search, 
  Wallet, 
  MessageSquare,
  Utensils,
  BarChart,
  Scale
} from 'lucide-react';
import { Tip, Callout, Summary, Definition } from '@/components/DocBlocks';


export default function SortingIntroductionPage() {
  return (
    <div id="sorting-introduction-page" className="w-full mx-auto px-4 py-4 font-sans">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Introduction to Sorting Algorithms
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Transitioning from Data Structures to Algorithms, one of the most fundamental operations in Computer Science is <strong>Sorting</strong>. Understanding how to arrange data efficiently is critical for building scalable software systems.
        </p>
      </div>

      {/* What is Sorting? */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            What is Sorting?
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Sorting is a process of arranging elements in a specific order (often numerical or lexicographical). Suppose you have an array of random numbers like <code className="font-mono text-blue-600 dark:text-blue-400">1, 9, 8, 2, 7</code>. Sorting involves applying a systematic procedure to reorganize these elements.
        </p>

        <Definition term="Sorting">
          The computational process of reorganizing a sequence of items so they are arranged in a specific, predefined, sequential order.
        </Definition>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <ArrowLeftRight className="h-4 w-4" />
              Ascending Order
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Arranging elements from the smallest to the largest.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
              <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">1, 2, 7, 8, 9</code>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <ArrowLeftRight className="h-4 w-4" />
              Descending Order
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Arranging elements from the largest to the smallest.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
              <code className="font-mono text-rose-600 dark:text-rose-400 font-bold">9, 8, 7, 2, 1</code>
            </div>
          </div>
        </div>
      </section>

      {/* Why do we use sorting? */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <BarChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Why Do We Need Sorting? (Real-World Use Cases)
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          If you have millions of data points, finding the most relevant information quickly is crucial. Sorting algorithms are the underlying engines powering almost every data-heavy interface we use daily.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              Social Media & Content Feeds
            </strong>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When a video has 1 million comments, you often see options to sort by <strong>"Newest First"</strong> (sorting by date descending) or <strong>"Top Rated"</strong> (sorting by engagement score). A fast sorting algorithm allows platforms to rearrange this massive data in minimal time.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <Utensils className="h-4 w-4 text-rose-600" />
              E-commerce & Food Delivery
            </strong>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              On food delivery apps, restaurants are presented dynamically. Users sort by <strong>"Top Rated"</strong> to find quality food, or <strong>"Price: Low to High"</strong> to stick to a budget. The moment a user clicks the sort button, an algorithm executes to instantly reorganize the list.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
            <strong className="text-gray-900 dark:text-white flex items-center gap-1.5">
              <Wallet className="h-4 w-4 text-emerald-600" />
              Physical Daily Sorting
            </strong>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If handed a mixed stack of currency notes, you naturally place the highest denominations (₹500) at the bottom and lower denominations (₹100, ₹50, ₹10) on top. You perform this sorting by physically <strong>swapping</strong> their positions in your hand.
            </p>
          </div>
          
        </div>
      </section>

      {/* The Search Dependency */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Search className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            The Relationship Between Sorting and Searching
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Perhaps the most important reason we sort data in computer science is to enable <strong>faster data retrieval</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-2">
              Unsorted Data (Linear Search)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              If you have an unsorted array like <code className="font-mono text-gray-800 dark:text-gray-200">1, 2, 9, 20, 71, 33</code> and need to check if <code className="font-mono font-bold">9</code> is present, you must check every element one-by-one. 
              <br/><br/>
              If the element is missing, you are forced to make <strong>n</strong> comparisons (where n is the number of elements) before concluding it is not there.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 text-[10px] font-bold rounded-bl-lg">
              FAST RETRIEVAL
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-2">
              Sorted Data (Binary Search)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              As discussed in previous search modules, if an array is completely sorted, we unlock the ability to use <strong>Binary Search</strong>.
              <br/><br/>
              Binary search exponentially speeds up retrieval, but it has a strict prerequisite: <strong>The array must be sorted first.</strong> Sorting essentially sets the stage for high-performance querying.
            </p>
          </div>
        </div>

      </section>

      {/* Evaluating Sorting Algorithms */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
          <Scale className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Judging Sorting Algorithms
          </h2>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          There is no single "perfect" sorting algorithm. Every approach has its pros and cons depending on the shape and size of the data. 
          When we begin exploring different sorting algorithms, we will judge and compare them primarily based on two factors:
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <li className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
            <div className="mt-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white block mb-0.5">Time Complexity</strong>
              <span className="text-gray-600 dark:text-gray-400 text-xs">How fast the algorithm completes as the dataset grows.</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
            <div className="mt-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/></svg>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white block mb-0.5">Space Complexity</strong>
              <span className="text-gray-600 dark:text-gray-400 text-xs">How much extra memory the algorithm requires to perform the sorting.</span>
            </div>
          </li>
        </ul>

        <Callout type="info" title="The Swapping Operation">
          Under the hood, virtually all sorting algorithms rely heavily on the act of <strong>swapping</strong> (interchanging the positions of two elements). How cleverly an algorithm decides <em>which</em> elements to swap dictates its overall time complexity.
        </Callout>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Summary 
          points={[
            'Sorting is the systematic procedure of organizing items into an Ascending or Descending order.',
            'Sorting drives the user experience of modern applications, enabling features like filtering by "Newest" or "Lowest Price".',
            'Algorithms are evaluated based on their Time Complexity (speed) and Space Complexity (memory usage).',
            'A sorted array is a strict prerequisite for executing high-performance algorithms like Binary Search.',
            'There is no universally optimal sorting algorithm; selection depends entirely on the use case and dataset constraints.'
          ]} 
        />
      </section>

    </div>
  );
}
