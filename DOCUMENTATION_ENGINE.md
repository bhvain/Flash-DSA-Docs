# Documentation Engine Design Specification

**Author:** Lead Systems Architect & Documentation Engineer  
**Target:** Reusable Block-Based Content System  
**Status:** Approved Specification  
**Version:** 1.0.0  

---

## 1. Engine Philosophy: Content as Structured Data

A high-scale documentation site (like MDN or React Docs) must treat content not as free-form HTML/JSX markup, but as a structured, predictable tree of semantic blocks. Handcrafting individual pages leads to visual drift, layout duplication, and maintenance nightmares when managing 500+ topics.

This specification designs a **reusable documentation block engine** where pages are dynamically composed using a strict set of standardized, type-safe components. The goal is complete decoupling of content representation from visual presentation, ensuring a unified, accessible, and responsive user experience.

---

## 2. Reusable Documentation Blocks Specification

### 1. `Prerequisites`
*   **Purpose:** Establishes necessary baseline knowledge before the user begins reading, preventing cognitive overwhelm.
*   **Props:**
    ```typescript
    interface PrerequisiteItem {
      title: string;
      slug: string; // Internal route link
      difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    }
    interface PrerequisitesProps {
      items: PrerequisiteItem[];
    }
    ```
*   **When to Use:** At the absolute top of the page, directly under the page title (H1) and introduction, if the topic requires prior understanding of another data structure or mathematical concept (e.g., Doubly Linked Lists require understanding Singly Linked Lists).
*   **When NOT to Use:** On introductory or baseline pages (e.g., "Introduction to DSA" or "Big-O Notation Overview") which are designed to be entry points.

---

### 2. `QuickFacts`
*   **Purpose:** Provides a high-level, glanceable card summarizing the absolute essential characteristics of a data structure or algorithm (typically the primary Big-O complexities and main characteristics).
*   **Props:**
    ```typescript
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
    ```
*   **When to Use:** Floated to the top-right of the page body (on desktop layouts) or nested directly after the introductory paragraph. Acts as an instant reference.
*   **When NOT to Use:** On theoretical pages, conceptual guidelines, practice quiz pages, or mathematical sub-topics (like "Cases and Logs").

---

### 3. `Definition`
*   **Purpose:** Formally isolates and highlights a core technical term, concept, or structural invariant in a visually distinct panel.
*   **Props:**
    ```typescript
    interface DefinitionProps {
      term: string;
      pronunciation?: string;
      etymology?: string; // e.g. "From Latin..." for deep educational context
      children: React.ReactNode; // The core definition body
    }
    ```
*   **When to Use:** When introducing a major concept for the first time in a curriculum thread (e.g., "Singly Linked List", "Sentinel Node", "Big-O Notation").
*   **When NOT to Use:** For general narrative paragraphs or simple explanations. It should be reserved exclusively for strict definitions.

---

### 4. `Tags`
*   **Purpose:** Categorizes the page across multiple taxonomy dimensions, aiding search indexing, difficulty mapping, and related topic routing.
*   **Props:**
    ```typescript
    interface TagsProps {
      categories: string[];
      difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
      estimatedReadTimeMinutes: number;
    }
    ```
*   **When to Use:** Placed at the very top of the page metadata banner, just beneath the primary category breadcrumbs.
*   **When NOT to Use:** Inside body copy or section dividers.

---

### 5. `AlgorithmSteps`
*   **Purpose:** Deconstructs a complex procedural algorithm into a clear, numbered sequence of mathematical or programmatic steps before code execution is presented.
*   **Props:**
    ```typescript
    interface Step {
      title: string;
      description: string;
      pointerState?: string; // Optional visual debugger annotation (e.g., "temp = head")
    }
    interface AlgorithmStepsProps {
      steps: Step[];
      ordered?: boolean;
    }
    ```
*   **When to Use:** Directly preceding a code block. It translates abstract human thought into physical structural modifications (e.g., "Step 1: Create a new node. Step 2: Set its next pointer to head...").
*   **When NOT to Use:** For simple high-level ideas, non-procedural theories, or basic conceptual overviews.

---

### 6. `VisualizationContainer`
*   **Purpose:** Provides a standardized, interactive stage for rendering real-time animations, memory layouts, heap charts, or mathematical graphs.
*   **Props:**
    ```typescript
    interface VisualizationContainerProps {
      title: string;
      caption?: string;
      interactive?: boolean;
      children: React.ReactNode; // Mount point for the specific Lab/Visualizer component
    }
    ```
*   **When to Use:** Centered on the page, sitting comfortably between the theoretical definition/steps and the concrete code implementation.
*   **When NOT to Use:** To hold static images or standard textual code blocks.

---

### 7. `CodeBlock`
*   **Purpose:** Displays clean, structured, and syntax-highlighted source code with formatting and functional helper utilities (like a Copy button).
*   **Props:**
    ```typescript
    interface CodeBlockProps {
      code: string;
      language: 'c' | 'cpp' | 'python' | 'javascript' | 'typescript';
      filename?: string;
      highlightedLines?: number[]; // Dynamic array indicating critical statements to focus on
    }
    ```
*   **When to Use:** Directly below the `AlgorithmSteps` or `VisualizationContainer` to show the final, physical implementation of the concepts discussed.
*   **When NOT to Use:** To show pseudocode (use a styled list or inline monospace blocks instead) or mathematical formulas.

---

### 8. `ComplexityTable`
*   **Purpose:** Compares the mathematical runtimes (Time and Space) of multiple distinct operations under varying execution branches (Worst, Average, Best).
*   **Props:**
    ```typescript
    interface ComplexityRow {
      operation: string;
      bestCase: string;
      averageCase: string;
      worstCase: string;
      spaceComplexity: string;
    }
    interface ComplexityTableProps {
      rows: ComplexityRow[];
      highlightedRowIndex?: number;
    }
    ```
*   **When to Use:** In summary sections or comparative reference sheets, giving the user a unified performance review.
*   **When NOT to Use:** On individual procedural action pages (e.g., "Prepend to Linked List") where only a single operation is executed (the `QuickFacts` component handles single metrics better).

---

### 9. `Comparison`
*   **Purpose:** Contrasts two closely related structures or algorithms across a defined list of operational criteria (e.g., Array vs Linked List, Linear vs Binary Search).
*   **Props:**
    ```typescript
    interface ComparisonDimension {
      criterion: string;
      optionAValue: string;
      optionBValue: string;
    }
    interface ComparisonProps {
      optionAName: string;
      optionBName: string;
      dimensions: ComparisonDimension[];
    }
    ```
*   **When to Use:** On dedicated summary and overview pages (like `/docs/linear/overview`), helping users make informed architectural decisions.
*   **When NOT to Use:** On isolated topic pages where the focus is strictly on understanding a single specific structure.

---

### 10. `Tip` & `Warning`
*   **Purpose:** Alerts readers to critical optimization notes, common bugs, undefined behaviors, or standard student pitfalls.
*   **Props:**
    ```typescript
    interface AlertProps {
      title?: string;
      children: React.ReactNode;
    }
    ```
*   **When to Use:** Embellished inline within body text to call attention to important gotchas (e.g., Warning: Forgetting to free memory in C, Tip: Using bitwise shifting to optimize arithmetic operations).
*   **When NOT to Use:** To represent standard narrative paragraphs or formal algorithmic steps.

---

### 11. `InterviewInsight`
*   **Purpose:** Connects abstract structures and math to concrete LeetCode patterns and typical engineering interview questions.
*   **Props:**
    ```typescript
    interface InterviewQuestion {
      title: string;
      link?: string;
      frequency: 'Low' | 'Medium' | 'High';
      keyInsight: string;
    }
    interface InterviewInsightProps {
      patternName: string;
      questions: InterviewQuestion[];
    }
    ```
*   **When to Use:** At the foot of a topic page, serving as an exciting, real-world application of the concept.
*   **When NOT to Use:** On theoretical baseline pages or mathematical introductions.

---

### 12. `Applications`
*   **Purpose:** Lists real-world system applications of the data structure, answering the perpetual student question: *"Where is this actually used?"*
*   **Props:**
    ```typescript
    interface ApplicationItem {
      system: string; // e.g., "Operating System Process Schedulers"
      reason: string; // e.g., "Uses circular linked lists to assign CPU time slices fairly"
    }
    interface ApplicationsProps {
      items: ApplicationItem[];
    }
    ```
*   **When to Use:** Near the conclusion of a topic, bridging the gap between theory and actual system engineering.
*   **When NOT to Use:** In math-only notation tutorials.

---

### 13. `RelatedTopics`
*   **Purpose:** Directs users to adjacent topics, fostering organic exploration and reinforcement of concepts.
*   **Props:**
    ```typescript
    interface RelatedTopicItem {
      title: string;
      slug: string;
      description: string;
    }
    interface RelatedTopicsProps {
      topics: RelatedTopicItem[];
    }
    ```
*   **When to Use:** Located in the footer section, directly preceding the layout's sequential Prev/Next buttons.
*   **When NOT to Use:** Within the upper content folds.

---

### 14. `Summary`
*   **Purpose:** Recaps key takeaways in a concise, bulleted format to reinforce the user's learning.
*   **Props:**
    ```typescript
    interface SummaryProps {
      points: string[];
    }
    ```
*   **When to Use:** At the end of a long topic page, directly before the related links and quiz triggers.
*   **When NOT to Use:** On extremely short pages or simple, single-concept overviews.

---

## 3. Block Composition: The Rhythm of Cognitive Load

A professional documentation portal organizes these blocks to match the reader's cognitive flow, leading them naturally from abstract ideas to concrete implementations:

```text
       COGNITIVE ENTRY (Breadcrumbs, H1, Tags, Prerequisites)
                             │
                             ▼
         INTUITION SCAFFOLDING (Analogy, Formal Definition)
                             │
                             ▼
        PERFORMANCE BOUNDARIES (QuickFacts, ComplexityTable)
                             │
                             ▼
         PROCEDURAL MAPPING (AlgorithmSteps, Visualization)
                             │
                             ▼
       CONCRETE IMPLEMENTATION (CodeBlock, Inline Warnings)
                             │
                             ▼
    REAL-WORLD TRANSITION (Applications, InterviewInsight, Quiz)
                             │
                             ▼
        NAVIGATION & EXIT (Summary, RelatedTopics, Pagination)
```

By organizing pages using these standardized, reusable blocks rather than unique handcrafted structures, we achieve several key benefits:
1.  **Total UI Consistency:** Font choices, border radii, margin rhythms, and color schemes are applied uniformly across all 500+ pages.
2.  **Strict Separation of Concerns:** Content authors can write raw, structured Markdown files while design engineers update the look and feel globally.
3.  **High-Performance Execution:** Components can be lazy-loaded, compiled statically, and optimized independently to deliver lightning-fast loading speeds.
