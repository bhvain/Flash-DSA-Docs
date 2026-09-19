import * as React from 'react';
import { 
  AlertCircle, 
  HelpCircle, 
  BookOpen, 
  Info, 
  CheckCircle2, 
  Flame, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Clock, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Re-export existing CodeBlock for centralized access
export { CodeBlock } from './CodeBlock';

// -------------------------------------------------------------
// 1. PREREQUISITES
// -------------------------------------------------------------
interface PrerequisiteItem {
  title: string;
  slug: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface PrerequisitesProps {
  items: PrerequisiteItem[];
}

export function Prerequisites({ items }: PrerequisitesProps) {
  return null;
}

// -------------------------------------------------------------
// 2. QUICK FACTS
// -------------------------------------------------------------
interface QuickFactsProps {
  timeComplexity: {
    access: string;
    search: string;
    insertion: string;
    deletion: string;
  };
  spaceComplexity: string;
  memoryAllocation: 'Contiguous' | 'Segmented' | 'Hybrid';
}

export function QuickFacts({ timeComplexity, spaceComplexity, memoryAllocation }: QuickFactsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8 p-4 rounded-xl border border-gray-300 dark:border-gray-800 bg-gray-100/70 dark:bg-gray-900/30">
      <div className="flex flex-col p-2.5 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800/80 shadow-2xs">
        <span className="text-[10px] uppercase font-extrabold text-gray-600 dark:text-gray-400 tracking-wider">Access</span>
        <span className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100 mt-1">{timeComplexity.access}</span>
      </div>
      <div className="flex flex-col p-2.5 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800/80 shadow-2xs">
        <span className="text-[10px] uppercase font-extrabold text-gray-600 dark:text-gray-400 tracking-wider">Search</span>
        <span className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100 mt-1">{timeComplexity.search}</span>
      </div>
      <div className="flex flex-col p-2.5 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800/80 shadow-2xs">
        <span className="text-[10px] uppercase font-extrabold text-gray-600 dark:text-gray-400 tracking-wider">Insertion</span>
        <span className="text-sm font-mono font-extrabold text-purple-700 dark:text-purple-400 mt-1">{timeComplexity.insertion}</span>
      </div>
      <div className="flex flex-col p-2.5 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800/80 shadow-2xs">
        <span className="text-[10px] uppercase font-extrabold text-gray-600 dark:text-gray-400 tracking-wider">Deletion</span>
        <span className="text-sm font-mono font-extrabold text-purple-700 dark:text-purple-400 mt-1">{timeComplexity.deletion}</span>
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1 p-2.5 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800/80 shadow-2xs">
        <span className="text-[10px] uppercase font-extrabold text-gray-600 dark:text-gray-400 tracking-wider">Space / Memory</span>
        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 mt-1 flex flex-col gap-0.5">
          <span className="font-mono font-bold">{spaceComplexity}</span>
          <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{memoryAllocation}</span>
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. DEFINITION
// -------------------------------------------------------------
interface DefinitionProps {
  term?: string;
  title?: string;
  pronunciation?: string;
  etymology?: string;
  description?: string;
  definition?: string;
  notation?: string;
  properties?: { label: string; value: string }[];
  children?: React.ReactNode;
}

export function Definition({ term, title, pronunciation, etymology, description, definition, notation, properties, children }: DefinitionProps) {
  const displayTerm = term || title || "Definition";
  const bodyText = description || definition;

  return (
    <div className="mb-6 p-5 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 dark:bg-purple-500" />
      <div className="flex flex-wrap items-baseline gap-2.5 mb-2">
        <h3 className="text-base font-bold text-gray-950 dark:text-white font-sans">{displayTerm}</h3>
        {pronunciation && (
          <span className="text-xs text-gray-600 dark:text-gray-400 font-mono font-medium">/ {pronunciation} /</span>
        )}
        {etymology && (
          <span className="text-[11px] text-gray-600 dark:text-gray-400 italic">({etymology})</span>
        )}
      </div>
      {bodyText && (
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans mb-3">{bodyText}</p>
      )}
      {notation && (
        <div className="my-2 p-2.5 bg-purple-50/70 dark:bg-gray-900 rounded-lg font-mono text-xs text-purple-800 dark:text-purple-300 font-semibold border border-purple-200 dark:border-gray-800">
          {notation}
        </div>
      )}
      {children && (
        <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans">{children}</div>
      )}
      {properties && properties.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800/80 space-y-2">
          {properties.map((prop, idx) => (
            <div key={idx} className="text-xs">
              <span className="font-bold text-gray-950 dark:text-gray-100 mr-2">{prop.label}:</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{prop.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 4. TAGS
// -------------------------------------------------------------
interface TagsProps {
  categories: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedReadTimeMinutes: number;
}

export function Tags({ categories, difficulty, estimatedReadTimeMinutes }: TagsProps) {
  return null;
}

// -------------------------------------------------------------
// 5. ALGORITHM STEPS
// -------------------------------------------------------------
interface Step {
  step?: number;
  title: string;
  description: string;
  codeSnippet?: string;
  pointerState?: string;
}

interface AlgorithmStepsProps {
  steps: Step[];
}

export function AlgorithmSteps({ steps }: AlgorithmStepsProps) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-extrabold text-gray-700 dark:text-gray-400 uppercase tracking-wider mb-3">
        Step-by-Step Logic
      </h4>
      <ol className="relative border-l-2 border-gray-300 dark:border-gray-800 ml-3.5 space-y-4">
        {steps.map((step, idx) => (
          <li key={idx} className="relative pl-6">
            <span className="absolute -left-[15px] top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-purple-600 dark:border-purple-500 bg-white dark:bg-gray-950 text-xs font-extrabold text-purple-700 dark:text-purple-300 shadow-2xs">
              {idx + 1}
            </span>
            <div className="pt-1">
              <h5 className="text-sm font-bold text-gray-950 dark:text-white">{step.title}</h5>
              <p className="text-xs text-gray-800 dark:text-gray-300 mt-1 leading-relaxed font-medium">
                {step.description}
              </p>
              {step.codeSnippet && (
                <div className="mt-2 inline-block font-mono text-xs bg-purple-50 dark:bg-gray-900 text-purple-800 dark:text-purple-300 px-2.5 py-1 rounded-md border border-purple-200 dark:border-gray-800 font-semibold">
                  {step.codeSnippet}
                </div>
              )}
              {step.pointerState && (
                <div className="mt-1.5 inline-block text-[10px] font-mono bg-purple-100/70 dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-900/40 font-bold">
                  State: <span className="font-extrabold">{step.pointerState}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// -------------------------------------------------------------
// 6. VISUALIZATION CONTAINER
// -------------------------------------------------------------
interface VisualizationContainerProps {
  title: string;
  caption?: string;
  interactive?: boolean;
  children: React.ReactNode;
}

export function VisualizationContainer({ title, caption, interactive = true, children }: VisualizationContainerProps) {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-sm">
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800/80 flex items-center justify-between">
        <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
          <span>{title}</span>
        </h4>
        {interactive && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 animate-pulse">
            Interactive Lab
          </span>
        )}
      </div>
      <div className="p-4 bg-gray-50/10 dark:bg-gray-950/20">{children}</div>
      {caption && (
        <div className="px-4 py-2.5 bg-gray-50/50 dark:bg-gray-900/20 border-t border-gray-200 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 italic">
          {caption}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 7. COMPLEXITY TABLE
// -------------------------------------------------------------
interface ComplexityRow {
  operation: string;
  bestCase?: string;
  averageCase?: string;
  worstCase?: string;
  timeComplexity?: string;
  spaceComplexity: string;
  notes?: string;
}

interface ComplexityTableProps {
  rows?: ComplexityRow[];
  operations?: ComplexityRow[];
  highlightedRowIndex?: number;
}

export function ComplexityTable({ rows, operations, highlightedRowIndex }: ComplexityTableProps) {
  const data = operations || rows || [];
  const hasDetailedCases = data.some(item => item.bestCase || item.worstCase);

  return (
    <div className="mb-6 overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-800 bg-gray-100/80 dark:bg-gray-900/60">
            <th className="p-3.5 text-xs font-extrabold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Operation</th>
            {hasDetailedCases ? (
              <>
                <th className="p-3.5 text-xs font-extrabold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Best Case</th>
                <th className="p-3.5 text-xs font-extrabold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Average Case</th>
                <th className="p-3.5 text-xs font-extrabold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Worst Case</th>
              </>
            ) : (
              <th className="p-3.5 text-xs font-extrabold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Time Complexity</th>
            )}
            <th className="p-3.5 text-xs font-extrabold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Space Complexity</th>
            {!hasDetailedCases && data.some(item => item.notes) && (
              <th className="p-3.5 text-xs font-extrabold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Notes</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800/60">
          {data.map((row, idx) => (
            <tr 
              key={idx} 
              className={cn(
                "hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors",
                highlightedRowIndex === idx && "bg-purple-50 dark:bg-purple-950/20 font-medium"
              )}
            >
              <td className="p-3.5 text-xs font-bold text-gray-950 dark:text-gray-100">{row.operation}</td>
              {hasDetailedCases ? (
                <>
                  <td className="p-3.5 text-xs font-mono font-semibold text-gray-800 dark:text-gray-300">{row.bestCase || '—'}</td>
                  <td className="p-3.5 text-xs font-mono font-semibold text-gray-800 dark:text-gray-300">{row.averageCase || '—'}</td>
                  <td className="p-3.5 text-xs font-mono text-purple-700 dark:text-purple-400 font-bold">{row.worstCase || '—'}</td>
                </>
              ) : (
                <td className="p-3.5 text-xs font-mono text-purple-700 dark:text-purple-400 font-bold">{row.timeComplexity || '—'}</td>
              )}
              <td className="p-3.5 text-xs font-mono font-semibold text-gray-800 dark:text-gray-300">{row.spaceComplexity}</td>
              {!hasDetailedCases && data.some(item => item.notes) && (
                <td className="p-3.5 text-xs text-gray-800 dark:text-gray-300 font-medium">{row.notes || '—'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// -------------------------------------------------------------
// 8. COMPARISON TABLE
// -------------------------------------------------------------
interface ComparisonDimension {
  criterion: string;
  optionAValue: string;
  optionBValue: string;
}

interface ComparisonTableProps {
  optionAName: string;
  optionBName: string;
  dimensions: ComparisonDimension[];
}

export function ComparisonTable({ optionAName, optionBName, dimensions }: ComparisonTableProps) {
  return (
    <div className="mb-6 overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xs">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-800 bg-gray-100/80 dark:bg-gray-900/60">
            <th className="p-3.5 text-xs font-extrabold text-gray-800 dark:text-gray-300 uppercase tracking-wider w-1/3">Criterion</th>
            <th className="p-3.5 text-xs font-extrabold text-purple-700 dark:text-purple-400 uppercase tracking-wider w-1/3">{optionAName}</th>
            <th className="p-3.5 text-xs font-extrabold text-gray-900 dark:text-gray-200 uppercase tracking-wider w-1/3">{optionBName}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800/60 text-xs">
          {dimensions.map((dim, idx) => (
            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors">
              <td className="p-3.5 font-bold text-gray-950 dark:text-gray-100">{dim.criterion}</td>
              <td className="p-3.5 text-gray-800 dark:text-gray-300 leading-relaxed font-medium">{dim.optionAValue}</td>
              <td className="p-3.5 text-gray-800 dark:text-gray-300 leading-relaxed font-medium">{dim.optionBValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// -------------------------------------------------------------
// 9. TIPS & WARNINGS
// -------------------------------------------------------------
interface AlertProps {
  title?: string;
  children: React.ReactNode;
}

export function Tip({ title = "Performance Optimization", children }: AlertProps) {
  return (
    <div className="mb-6 p-4 rounded-xl border border-blue-200 dark:border-blue-950/60 bg-blue-50/80 dark:bg-blue-950/20 flex items-start gap-3 shadow-2xs">
      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
      <div>
        <h4 className="text-xs font-extrabold text-blue-950 dark:text-blue-300 uppercase tracking-wider mb-1">
          {title}
        </h4>
        <div className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed font-medium">{children}</div>
      </div>
    </div>
  );
}

export function Warning({ title = "Warning / Pitfall", children }: AlertProps) {
  return (
    <div className="mb-6 p-4 rounded-xl border border-amber-300 dark:border-amber-950/60 bg-amber-50/90 dark:bg-amber-950/20 flex items-start gap-3 shadow-2xs">
      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div>
        <h4 className="text-xs font-extrabold text-amber-950 dark:text-amber-300 uppercase tracking-wider mb-1">
          {title}
        </h4>
        <div className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed font-medium">{children}</div>
      </div>
    </div>
  );
}

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'note' | 'danger';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const isWarning = type === 'warning' || type === 'danger';
  const isTip = type === 'tip';
  
  if (isWarning) {
    return <Warning title={title || "Warning"}>{children}</Warning>;
  }
  
  return <Tip title={title || "Note"}>{children}</Tip>;
}

// -------------------------------------------------------------
// 10. INTERVIEW INSIGHT
// -------------------------------------------------------------
interface InterviewQuestion {
  title: string;
  link?: string;
  frequency: 'Very High' | 'High' | 'Medium' | 'Low';
  keyInsight: string;
}

interface InterviewInsightProps {
  patternName: string;
  questions: InterviewQuestion[];
}

export function InterviewInsight({ patternName, questions }: InterviewInsightProps) {
  return (
    <div className="mb-8 p-5 rounded-xl border border-purple-200 dark:border-purple-900/40 bg-purple-50/60 dark:bg-purple-950/20 shadow-2xs">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-4.5 w-4.5 text-purple-700 dark:text-purple-400 animate-pulse" />
        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-800 dark:text-purple-300">
          Interview Insights &amp; LeetCode Patterns: {patternName}
        </span>
      </div>
      <div className="space-y-3.5">
        {questions.map((q, idx) => (
          <div 
            key={idx} 
            className="p-3.5 bg-white dark:bg-gray-950 border border-purple-100 dark:border-gray-800 rounded-lg shadow-2xs"
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h5 className="text-xs font-bold text-gray-950 dark:text-white flex items-center gap-1.5">
                {q.title}
                {q.link && (
                  <a 
                    href={q.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </h5>
              <span className={cn(
                "text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider",
                (q.frequency === 'High' || q.frequency === 'Very High') && "bg-rose-100 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300",
                q.frequency === 'Medium' && "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300",
                q.frequency === 'Low' && "bg-gray-100 text-gray-800 dark:bg-gray-900/60 dark:text-gray-300"
              )}>
                Freq: {q.frequency}
              </span>
            </div>
            <p className="text-xs text-gray-800 dark:text-gray-300 leading-relaxed font-sans font-medium">
              <strong className="text-purple-800 dark:text-purple-400 font-bold">Strategy:</strong> {q.keyInsight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. MEMORY LAYOUT CELL MAP
// -------------------------------------------------------------
interface MemoryCell {
  address: string;
  value: string;
  label?: string;
  highlighted?: boolean;
}

interface MemoryLayoutProps {
  cells: MemoryCell[];
  type?: 'Continuous' | 'Segmented';
}

export function MemoryLayout({ cells, type = 'Continuous' }: MemoryLayoutProps) {
  return (
    <div className="mb-6 p-4 rounded-xl border border-gray-300 dark:border-gray-800 bg-gray-100/60 dark:bg-gray-900/20">
      <div className="flex items-center justify-between mb-3 text-[11px] font-extrabold text-gray-700 dark:text-gray-400 uppercase tracking-wider">
        <span>Memory Model ({type})</span>
        <span className="flex items-center gap-1">
          <Cpu className="h-3.5 w-3.5 text-purple-600" /> Physical RAM cells
        </span>
      </div>
      <div className={cn(
        "flex flex-wrap gap-2.5 items-center justify-center py-2",
        type === 'Segmented' && "flex-col sm:flex-row"
      )}>
        {cells.map((cell, idx) => (
          <React.Fragment key={idx}>
            <div 
              className={cn(
                "flex flex-col items-center border rounded-lg bg-white dark:bg-gray-950 transition-all duration-200 shadow-2xs w-16 sm:w-20 overflow-hidden",
                cell.highlighted 
                  ? "border-purple-600 dark:border-purple-500 ring-2 ring-purple-200 dark:ring-purple-950/60" 
                  : "border-gray-300 dark:border-gray-800"
              )}
            >
              <div className="text-[9px] font-mono bg-gray-100 dark:bg-gray-900 w-full text-center py-1 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 font-bold">
                {cell.address}
              </div>
              <div className="p-2 font-mono text-xs font-bold text-gray-950 dark:text-gray-100">
                {cell.value}
              </div>
              {cell.label && (
                <div className="text-[9px] text-purple-800 dark:text-purple-300 font-extrabold py-0.5 border-t border-gray-100 dark:border-gray-900 w-full text-center truncate px-1 bg-purple-50/50 dark:bg-purple-950/20">
                  {cell.label}
                </div>
              )}
            </div>
            {type === 'Segmented' && idx < cells.length - 1 && (
              <div className="text-gray-400 dark:text-gray-600 font-bold self-center rotate-90 sm:rotate-0 select-none">
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 12. APPLICATIONS
// -------------------------------------------------------------
interface ApplicationItem {
  system: string;
  reason: string;
}

interface ApplicationsProps {
  items: ApplicationItem[];
}

export function Applications({ items }: ApplicationsProps) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-extrabold text-gray-700 dark:text-gray-400 uppercase tracking-wider mb-3">
        Real-World Applications
      </h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="p-3.5 rounded-xl border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-400 dark:hover:border-gray-700 transition-colors shadow-2xs"
          >
            <h5 className="text-xs font-bold text-gray-950 dark:text-white flex items-center gap-1.5 mb-1.5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
              {item.system}
            </h5>
            <p className="text-xs text-gray-800 dark:text-gray-300 leading-relaxed font-medium">
              {item.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 13. SUMMARY
// -------------------------------------------------------------
interface SummaryProps {
  points: string[];
}

export function Summary({ points }: SummaryProps) {
  return (
    <div className="mb-6 p-5 rounded-2xl border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/20 shadow-xs">
      <div className="flex items-center gap-2 mb-3.5">
        <CheckCircle2 className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
          Key Takeaways &amp; Summary
        </span>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-emerald-950 dark:text-emerald-200 font-sans font-medium">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2 bg-white/60 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <span className="leading-relaxed font-semibold">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// -------------------------------------------------------------
// 14. RELATED TOPICS
// -------------------------------------------------------------
interface RelatedTopicItem {
  title: string;
  slug: string;
  description: string;
}

interface RelatedTopicsProps {
  topics: RelatedTopicItem[];
}

export function RelatedTopics({ topics }: RelatedTopicsProps) {
  return null;
}
