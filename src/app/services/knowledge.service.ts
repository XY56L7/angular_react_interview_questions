import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Framework, FrameworkToggleService } from './framework-toggle.service';
import { map } from 'rxjs/operators';

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  codeExamples?: { title: string, code: string }[];
  relatedLinks?: { title: string, url: string }[];
  framework?: Framework;
}

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {
  private articles: Article[] = [
    {
      id: 1,
      title: 'Understanding Components in Angular',
      content: `
        <p>Components are the most basic building block of an Angular application. They display data on the screen, listen for user input, and take action based on that input.</p>
        
        <h3>Component Structure</h3>
        <p>An Angular component consists of:</p>
        <ul>
          <li>A TypeScript class that contains the component logic</li>
          <li>An HTML template that defines the view</li>
          <li>CSS styles that define the appearance</li>
          <li>A metadata decorator that connects these parts</li>
        </ul>
        
        <h3>Component Lifecycle</h3>
        <p>Angular components have a lifecycle that allows you to tap into key moments in that lifecycle to perform actions. Some common lifecycle hooks include:</p>
        <ul>
          <li><strong>ngOnInit</strong>: Called once after the component is initialized</li>
          <li><strong>ngOnChanges</strong>: Called when input properties change</li>
          <li><strong>ngAfterViewInit</strong>: Called after the component's view has been initialized</li>
          <li><strong>ngOnDestroy</strong>: Called just before Angular destroys the component</li>
        </ul>
        
        <p>Implementing these lifecycle hooks can help you manage your component's state and behavior throughout its existence in the application.</p>
      `,
      category: 'Angular Core Concepts',
      tags: ['components', 'basics', 'lifecycle', 'angular'],
      createdAt: new Date('2023-10-15'),
      codeExamples: [
        {
          title: 'Basic Component',
          code: `
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`
    <h1>Hello, {{name}}!</h1>
    <button (click)="changeName()">Change Name</button>
  \`,
  styles: [\`
    h1 { color: blue; }
    button { background-color: #eee; }
  \`]
})
export class ExampleComponent {
  name = 'World';
  
  changeName() {
    this.name = 'Angular';
  }
}`
        }
      ],
      relatedLinks: [
        { title: 'Angular Components Documentation', url: 'https://angular.io/guide/component-overview' }
      ],
      framework: 'angular'
    },
    {
      id: 2,
      title: 'Angular Directives Explained',
      content: `
        <p>Directives are classes that add additional behavior to elements in your Angular applications. There are three kinds of directives in Angular:</p>
        
        <h3>1. Components</h3>
        <p>Components are directives with a template. They are the most common directive type you'll work with.</p>
        
        <h3>2. Structural Directives</h3>
        <p>Structural directives alter the DOM layout by adding and removing DOM elements.</p>
      `,
      category: 'Angular Core Concepts',
      tags: ['directives', 'structural directives', 'attribute directives', 'angular'],
      createdAt: new Date('2023-10-18'),
      codeExamples: [
        {
          title: 'Structural Directive Examples',
          code: `
<!-- *ngIf -->
<div *ngIf="isVisible">This content is visible when isVisible is true</div>

<!-- *ngFor -->
<ul>
  <li *ngFor="let item of items; let i = index">
    {{i}}: {{item.name}}
  </li>
</ul>`
        }
      ],
      relatedLinks: [
        { title: 'Angular Directives Documentation', url: 'https://angular.io/guide/built-in-directives' }
      ],
      framework: 'angular'
    },
    {
      id: 3,
      title: 'Angular Services and Dependency Injection',
      content: `
        <p>Services in Angular are a way to share data and functionality across components.</p>
        
        <h3>Dependency Injection</h3>
        <p>Dependency Injection (DI) is a design pattern in which a class requests dependencies from external sources rather than creating them.</p>
      `,
      category: 'Angular Services',
      tags: ['services', 'dependency injection', 'providers', 'angular'],
      createdAt: new Date('2023-10-22'),
      codeExamples: [
        {
          title: 'Basic Service',
          code: `
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: string[] = ['Item 1', 'Item 2', 'Item 3'];
  
  getData(): string[] {
    return this.data;
  }
}`
        }
      ],
      relatedLinks: [
        { title: 'Angular Services Documentation', url: 'https://angular.io/guide/creating-injectable-service' }
      ],
      framework: 'angular'
    },
    {
      id: 4,
      title: 'Angular Data Binding Explained',
      content: `
        <p>Data binding is a mechanism that allows you to connect your component's data to the DOM.</p>
        
        <h3>Types of Data Binding</h3>
        <ul>
          <li><strong>Interpolation</strong>: {{title}}</li>
          <li><strong>Property Binding</strong>: [src]="imageUrl"</li>
        </ul>
      `,
      category: 'Angular Core Concepts',
      tags: ['data binding', 'interpolation', 'property binding', 'angular'],
      createdAt: new Date('2023-10-25'),
      codeExamples: [
        {
          title: 'Data Binding Examples',
          code: `
<!-- Interpolation -->
<h1>{{title}}</h1>

<!-- Property Binding -->
<img [src]="imageUrl" [alt]="imageAlt">`
        }
      ],
      relatedLinks: [
        { title: 'Angular Data Binding Documentation', url: 'https://angular.io/guide/binding-syntax' }
      ],
      framework: 'angular'
    },
    {
      id: 5,
      title: 'Angular Routing: Navigation in Single Page Applications',
      content: `
        <p>Angular Router enables navigation from one view to the next as users perform tasks.</p>
        
        <h3>Key Concepts</h3>
        <p>Routes tell the Angular Router which components to display when a user navigates to a certain URL.</p>
      `,
      category: 'Angular Routing',
      tags: ['routing', 'navigation', 'SPA', 'angular'],
      createdAt: new Date('2023-10-30'),
      codeExamples: [
        {
          title: 'Basic Routing Configuration',
          code: `
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent }
];`
        }
      ],
      relatedLinks: [
        { title: 'Angular Routing Documentation', url: 'https://angular.io/guide/router' }
      ],
      framework: 'angular'
    },
    {
      id: 6,
      title: 'React Components and JSX Basics',
      content: `
        <p>React components are the fundamental building blocks of a React application. They can be written as functional components using JSX, a syntax extension that mixes HTML with JavaScript.</p>
        
        <h3>Functional Components</h3>
        <p>Modern React favors functional components over class components, using hooks for state and side effects.</p>
        
        <h3>JSX Rules</h3>
        <p>JSX requires a single parent element and allows JavaScript expressions within curly braces.</p>
      `,
      category: 'React Core Concepts',
      tags: ['components', 'jsx', 'react'],
      createdAt: new Date('2023-11-01'),
      codeExamples: [
        {
          title: 'Simple Functional Component',
          code: `
import React from 'react';

function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Welcome;
          `
        },
        {
          title: 'Component with Props',
          code: `
import React from 'react';

function Greeting({ message, user }) {
  return (
    <div>
      <h2>{message}</h2>
      <p>Welcome, {user.name}!</p>
    </div>
  );
}

export default Greeting;
// Usage: <Greeting message="Hi there" user={{ name: "Alex" }} />
          `
        }
      ],
      relatedLinks: [
        { title: 'React Components Documentation', url: 'https://react.dev/learn/your-first-component' }
      ],
      framework: 'react'
    },
    {
      id: 7,
      title: 'React Hooks - Managing State and Side Effects',
      content: `
        <p>React Hooks let you use state and other React features without writing a class component.</p>
        
        <h3>Common Hooks</h3>
        <ul>
          <li><strong>useState</strong>: For managing local component state</li>
          <li><strong>useEffect</strong>: For handling side effects like data fetching</li>
          <li><strong>useContext</strong>: For accessing context without nesting</li>
          <li><strong>useReducer</strong>: For complex state logic</li>
        </ul>
        
        <h3>Rules of Hooks</h3>
        <p>Hooks must be called at the top level of your components and can't be called conditionally.</p>
      `,
      category: 'React Core Concepts',
      tags: ['hooks', 'state', 'effects', 'react'],
      createdAt: new Date('2023-11-05'),
      codeExamples: [
        {
          title: 'useState Example',
          code: `
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
          `
        },
        {
          title: 'useEffect Example',
          code: `
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount
  
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;
  
  return (
    <div>
      <h2>Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
          `
        }
      ],
      relatedLinks: [
        { title: 'React Hooks Documentation', url: 'https://react.dev/reference/react/hooks' }
      ],
      framework: 'react'
    },
    {
      id: 8,
      title: 'React State Management with Context API',
      content: `
        <p>The Context API provides a way to share data between components without passing props manually through every level of the component tree.</p>
        
        <h3>When to Use Context</h3>
        <p>Context is designed to share data that can be considered "global" for a tree of React components, such as:</p>
        <ul>
          <li>Current authenticated user</li>
          <li>Theme preferences</li>
          <li>Language preferences</li>
        </ul>
        
        <h3>Context vs. Redux</h3>
        <p>For simpler applications, Context combined with useReducer can replace Redux. For complex state management with middleware needs, Redux might still be preferred.</p>
      `,
      category: 'React State Management',
      tags: ['context', 'state management', 'global state', 'react'],
      createdAt: new Date('2023-11-10'),
      codeExamples: [
        {
          title: 'Creating and Using Context',
          code: `
import React, { createContext, useContext, useState } from 'react';

// Create a context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // The value prop contains what we want to share
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}

// App
function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Theme Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}
          `
        }
      ],
      relatedLinks: [
        { title: 'React Context Documentation', url: 'https://react.dev/learn/passing-data-deeply-with-context' }
      ],
      framework: 'react'
    },
    {
      id: 9,
      title: 'React Router for Client-Side Navigation',
      content: `
        <p>React Router is the standard library for routing in React applications. It enables the creation of single-page applications with navigation without the page refreshing.</p>
        
        <h3>Key Components</h3>
        <ul>
          <li><strong>BrowserRouter</strong>: Uses the HTML5 history API</li>
          <li><strong>Routes</strong>: Contains Route components</li>
          <li><strong>Route</strong>: Renders a UI component when its path matches the current URL</li>
          <li><strong>Link</strong>: Creates a link for navigation without page reloads</li>
        </ul>
      `,
      category: 'React Routing',
      tags: ['routing', 'navigation', 'react-router', 'react'],
      createdAt: new Date('2023-11-15'),
      codeExamples: [
        {
          title: 'Basic Router Setup',
          code: `
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Pages
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const NotFound = () => <h2>404: Page Not Found</h2>;

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
          `
        }
      ],
      relatedLinks: [
        { title: 'React Router Documentation', url: 'https://reactrouter.com/en/main' }
      ],
      framework: 'react'
    },
    {
      id: 10,
      title: 'React Performance Optimization Techniques',
      content: `
        <p>As React applications grow, optimizing performance becomes increasingly important.</p>
        
        <h3>Common Performance Issues</h3>
        <ul>
          <li>Unnecessary re-renders</li>
          <li>Large component trees</li>
          <li>Expensive calculations</li>
          <li>Unoptimized dependencies</li>
        </ul>
        
        <h3>Optimization Techniques</h3>
        <ul>
          <li><strong>React.memo</strong>: For functional component memoization</li>
          <li><strong>useMemo</strong>: For memoizing expensive calculations</li>
          <li><strong>useCallback</strong>: For memoizing callbacks</li>
          <li><strong>Code Splitting</strong>: For smaller bundle sizes</li>
        </ul>
      `,
      category: 'React Performance',
      tags: ['performance', 'optimization', 'memoization', 'react'],
      createdAt: new Date('2023-11-20'),
      codeExamples: [
        {
          title: 'React.memo Example',
          code: `
import React from 'react';

// Without memoization - will re-render on every parent render
function RegularComponent({ name }) {
  console.log('RegularComponent rendered');
  return <div>Hello, {name}</div>;
}

// With memoization - only re-renders if props change
const MemoizedComponent = React.memo(function MemoizedComponent({ name }) {
  console.log('MemoizedComponent rendered');
  return <div>Hello, {name}</div>;
});

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      
      <RegularComponent name="John" />
      <MemoizedComponent name="Jane" />
    </div>
  );
}
          `
        },
        {
          title: 'useMemo and useCallback Examples',
          code: `
import React, { useState, useMemo, useCallback } from 'react';

function ExpensiveCalculationDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Without useMemo - would recalculate on every render
  // const expensiveResult = computeExpensiveValue(count);
  
  // With useMemo - only recalculates when count changes
  const expensiveResult = useMemo(() => {
    console.log('Computing expensive result...');
    // Simulating expensive calculation
    return count * 2 * Math.sqrt(count);
  }, [count]);
  
  // With useCallback - function reference stays the same
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return (
    <div>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Type something..." 
      />
      <p>Text: {text}</p>
      
      <button onClick={handleIncrement}>Increment Count</button>
      <p>Count: {count}</p>
      <p>Expensive Result: {expensiveResult}</p>
    </div>
  );
}
          `
        }
      ],
      relatedLinks: [
        { title: 'React Performance Optimization', url: 'https://react.dev/learn/render-and-commit' }
      ],
      framework: 'react'
    },
    {
      id: 11,
      title: 'React Fragments: Cleaner JSX Structures',
      content: `
    <p>React Fragments let you group elements without adding extra DOM nodes.</p>
    
    <h3>Why Use Fragments</h3>
    <p>Avoid unnecessary wrapper divs that can clutter the DOM or break styling.</p>
  `,
      category: 'React Core Concepts',
      tags: ['fragments', 'jsx', 'react'],
      createdAt: new Date('2024-01-10'),
      codeExamples: [
        {
          title: 'Using Fragments',
          code: `
import React from 'react';

function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}`
        }
      ],
      relatedLinks: [
        { title: 'React Fragments', url: 'https://react.dev/reference/react/Fragment' }
      ],
      framework: 'react'
    },
    {
      id: 12,
      title: 'React Custom Hooks for Reusable Logic',
      content: `
    <p>Custom Hooks allow you to extract and reuse stateful logic across components.</p>
    
    <h3>Benefits</h3>
    <p>Reduces duplication and improves maintainability.</p>
  `,
      category: 'React Hooks',
      tags: ['custom hooks', 'logic', 'react'],
      createdAt: new Date('2024-01-15'),
      codeExamples: [
        {
          title: 'Custom Hook Example',
          code: `
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);
  return data;
}

// Usage
function MyComponent() {
  const data = useFetch('https://api.example.com');
  return <pre>{JSON.stringify(data)}</pre>;
}`
        }
      ],
      relatedLinks: [
        { title: 'Building Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' }
      ],
      framework: 'react'
    },
    {
      id: 13,
      title: 'React Error Boundaries',
      content: `
    <p>Error Boundaries catch JavaScript errors in components and display fallback UI.</p>
    
    <h3>Implementation</h3>
    <p>Use class components with <code>componentDidCatch</code>.</p>
  `,
      category: 'React Error Handling',
      tags: ['error boundaries', 'errors', 'react'],
      createdAt: new Date('2024-01-20'),
      codeExamples: [
        {
          title: 'Error Boundary',
          code: `
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}`
        }
      ],
      relatedLinks: [
        { title: 'Error Boundaries', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary' }
      ],
      framework: 'react'
    },
    {
      id: 14,
      title: 'React Lazy Loading with Suspense',
      content: `
    <p>React supports lazy loading components to reduce initial bundle size.</p>
    
    <h3>Suspense</h3>
    <p>Wrap lazy components with Suspense for a loading fallback.</p>
  `,
      category: 'React Performance',
      tags: ['lazy loading', 'suspense', 'performance', 'react'],
      createdAt: new Date('2024-01-25'),
      codeExamples: [
        {
          title: 'Lazy Loading Example',
          code: `
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`
        }
      ],
      relatedLinks: [
        { title: 'React Lazy and Suspense', url: 'https://react.dev/reference/react/lazy' }
      ],
      framework: 'react'
    },
    {
      id: 15,
      title: 'React Portals for Modal Dialogs',
      content: `
    <p>Portals allow rendering components outside the parent DOM hierarchy.</p>
    
    <h3>Use Case</h3>
    <p>Ideal for modals, tooltips, and overlays.</p>
  `,
      category: 'React UI',
      tags: ['portals', 'modals', 'react'],
      createdAt: new Date('2024-01-30'),
      codeExamples: [
        {
          title: 'Modal with Portal',
          code: `
import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.body
  );
}

function App() {
  return <Modal>Modal Content</Modal>;
}`
        }
      ],
      relatedLinks: [
        { title: 'React Portals', url: 'https://react.dev/reference/react-dom/createPortal' }
      ],
      framework: 'react'
    },
    {
      id: 16,
      title: 'React Testing with Jest and React Testing Library',
      content: `
    <p>Testing React components ensures reliability using Jest and React Testing Library.</p>
    
    <h3>Approach</h3>
    <p>Focus on testing user behavior rather than implementation details.</p>
  `,
      category: 'React Testing',
      tags: ['testing', 'jest', 'react-testing-library', 'react'],
      createdAt: new Date('2024-02-05'),
      codeExamples: [
        {
          title: 'Component Test',
          code: `
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders button', () => {
  render(<MyComponent />);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});`
        }
      ],
      relatedLinks: [
        { title: 'React Testing Library', url: 'https://testing-library.com/docs/react-testing-library/intro/' }
      ],
      framework: 'react'
    },
    {
      id: 17,
      title: 'React Redux for State Management',
      content: `
    <p>Redux is a predictable state container for managing complex state in React apps.</p>
    
    <h3>Core Concepts</h3>
    <ul>
      <li>Store</li>
      <li>Actions</li>
      <li>Reducers</li>
    </ul>
  `,
      category: 'React State Management',
      tags: ['redux', 'state management', 'react'],
      createdAt: new Date('2024-02-10'),
      codeExamples: [
        {
          title: 'Basic Redux Setup',
          code: `
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    default: return state;
  }
};

const store = createStore(reducer);

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
    </div>
  );
}

function App() {
  return <Provider store={store}><Counter /></Provider>;
}`
        }
      ],
      relatedLinks: [
        { title: 'Redux Documentation', url: 'https://redux.js.org/' }
      ],
      framework: 'react'
    },
    {
      id: 18,
      title: 'React Refs for DOM Manipulation',
      content: `
    <p>Refs provide a way to access DOM elements or component instances directly.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li>Focusing an input</li>
      <li>Measuring element dimensions</li>
    </ul>
  `,
      category: 'React Core Concepts',
      tags: ['refs', 'dom', 'react'],
      createdAt: new Date('2024-02-15'),
      codeExamples: [
        {
          title: 'Using Refs',
          code: `
import React, { useRef, useEffect } from 'react';

function InputFocus() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return <input ref={inputRef} />;
}`
        }
      ],
      relatedLinks: [
        { title: 'React Refs', url: 'https://react.dev/learn/manipulating-the-dom-with-refs' }
      ],
      framework: 'react'
    },
    {
      id: 19,
      title: 'React Concurrent Rendering',
      content: `
    <p>Concurrent Rendering in React 18 improves performance by allowing interruptible rendering.</p>
    
    <h3>Features</h3>
    <ul>
      <li>startTransition</li>
      <li>useDeferredValue</li>
    </ul>
  `,
      category: 'React Advanced',
      tags: ['concurrent', 'performance', 'react'],
      createdAt: new Date('2024-02-20'),
      codeExamples: [
        {
          title: 'Using startTransition',
          code: `
import React, { useState, startTransition } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      setResults(search(value)); // Expensive operation
    });
  };

  return <input onChange={handleChange} value={query} />;
}`
        }
      ],
      relatedLinks: [
        { title: 'React 18 Concurrent Rendering', url: 'https://react.dev/blog/2022/03/29/react-v18' }
      ],
      framework: 'react'
    },
    {
      id: 20,
      title: 'React Server Components',
      content: `
    <p>Server Components (introduced as an experimental feature) allow rendering components on the server.</p>
    
    <h3>Benefits</h3>
    <ul>
      <li>Reduced client-side JavaScript</li>
      <li>Better SEO</li>
    </ul>
  `,
      category: 'React Advanced',
      tags: ['server components', 'ssr', 'react'],
      createdAt: new Date('2024-02-25'),
      codeExamples: [
        {
          title: 'Server Component (Experimental)',
          code: `
// Note: Requires a framework like Next.js 13+
function Profile({ userId }) {
  const user = db.getUser(userId); // Direct DB access on server
  return <h1>{user.name}</h1>;
}

Profile.server = true;`
        }
      ],
      relatedLinks: [
        { title: 'React Server Components', url: 'https://react.dev/blog/2020/12/21/introducing-zero-bundle-size-react-server-components' }
      ],
      framework: 'react'
    },
    {
      id: 11,
      title: 'Mastering Angular Forms: Template-Driven vs Reactive',
      content: `
    <p>Angular provides two approaches to handling forms: Template-Driven Forms and Reactive Forms. Each has its strengths depending on the use case.</p>
    
    <h3>Template-Driven Forms</h3>
    <p>These rely on directives in the template and are simpler for basic forms.</p>
    
    <h3>Reactive Forms</h3>
    <p>These are more robust, offering programmatic control and validation, ideal for complex scenarios.</p>
  `,
      category: 'Angular Forms',
      tags: ['forms', 'template-driven', 'reactive', 'validation', 'angular'],
      createdAt: new Date('2024-01-10'),
      codeExamples: [
        {
          title: 'Template-Driven Form',
          code: `
<form #myForm="ngForm" (ngSubmit)="onSubmit()">
  <input name="username" ngModel required>
  <button type="submit" [disabled]="!myForm.valid">Submit</button>
</form>`
        },
        {
          title: 'Reactive Form',
          code: `
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({...})
export class MyComponent {
  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      username: ['', Validators.required]
    });
  }
}`
        }
      ],
      relatedLinks: [
        { title: 'Angular Forms Guide', url: 'https://angular.io/guide/forms-overview' }
      ],
      framework: 'angular'
    },
    {
      id: 12,
      title: 'Angular Change Detection Strategies',
      content: `
    <p>Change detection in Angular determines when and how the UI updates. Angular offers two strategies: Default and OnPush.</p>
    
    <h3>Default Strategy</h3>
    <p>Checks every component on every change, which can impact performance in large apps.</p>
    
    <h3>OnPush Strategy</h3>
    <p>Only checks components when their inputs change or events occur, improving efficiency.</p>
  `,
      category: 'Angular Performance',
      tags: ['change detection', 'performance', 'onpush', 'angular'],
      createdAt: new Date('2024-01-15'),
      codeExamples: [
        {
          title: 'OnPush Component',
          code: `
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: '<p>{{data}}</p>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  @Input() data: string;
}`
        }
      ],
      relatedLinks: [
        { title: 'Change Detection in Angular', url: 'https://angular.io/guide/change-detection' }
      ],
      framework: 'angular'
    },
    {
      id: 13,
      title: 'Using RxJS in Angular for Reactive Programming',
      content: `
    <p>RxJS is deeply integrated into Angular for handling asynchronous operations like HTTP requests and event streams.</p>
    
    <h3>Key Operators</h3>
    <ul>
      <li><strong>map</strong>: Transforms emitted values</li>
      <li><strong>filter</strong>: Filters emitted values</li>
      <li><strong>switchMap</strong>: Maps to a new observable</li>
    </ul>
  `,
      category: 'Angular RxJS',
      tags: ['rxjs', 'reactive', 'observables', 'angular'],
      createdAt: new Date('2024-01-20'),
      codeExamples: [
        {
          title: 'Search with RxJS',
          code: `
import { debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({...})
export class SearchComponent {
  searchTerm = new Subject<string>();
  results$: Observable<any>;

  constructor(private http: HttpClient) {
    this.results$ = this.searchTerm.pipe(
      debounceTime(300),
      switchMap(term => this.http.get(\`/api/search?q=\${term}\`))
    );
  }
}`
        }
      ],
      relatedLinks: [
        { title: 'RxJS with Angular', url: 'https://angular.io/guide/rxjs' }
      ],
      framework: 'angular'
    },
    {
      id: 14,
      title: 'Angular Pipes: Transforming Data in Templates',
      content: `
    <p>Pipes in Angular transform data directly in the template, making it easy to format values.</p>
    
    <h3>Built-in Pipes</h3>
    <p>Examples include <code>date</code>, <code>uppercase</code>, and <code>currency</code>.</p>
    
    <h3>Custom Pipes</h3>
    <p>You can create custom pipes for specific transformations.</p>
  `,
      category: 'Angular Core Concepts',
      tags: ['pipes', 'template', 'transformation', 'angular'],
      createdAt: new Date('2024-01-25'),
      codeExamples: [
        {
          title: 'Custom Pipe',
          code: `
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
// Usage: {{ text | truncate:10 }}
`
        }
      ],
      relatedLinks: [
        { title: 'Angular Pipes Documentation', url: 'https://angular.io/guide/pipes' }
      ],
      framework: 'angular'
    },
    {
      id: 15,
      title: 'Angular Lazy Loading Modules',
      content: `
    <p>Lazy loading in Angular delays the loading of modules until they’re needed, improving initial load times.</p>
    
    <h3>How It Works</h3>
    <p>Use <code>loadChildren</code> in the router configuration to specify lazy-loaded modules.</p>
  `,
      category: 'Angular Routing',
      tags: ['lazy loading', 'routing', 'performance', 'angular'],
      createdAt: new Date('2024-01-30'),
      codeExamples: [
        {
          title: 'Lazy Loading Route',
          code: `
const routes: Routes = [
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) }
];`
        }
      ],
      relatedLinks: [
        { title: 'Lazy Loading in Angular', url: 'https://angular.io/guide/lazy-loading-ngmodules' }
      ],
      framework: 'angular'
    },
    {
      id: 16,
      title: 'Angular Interceptors for HTTP Requests',
      content: `
    <p>HTTP Interceptors in Angular allow you to modify requests and responses globally.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li>Adding authentication tokens</li>
      <li>Logging requests</li>
      <li>Handling errors</li>
    </ul>
  `,
      category: 'Angular HTTP',
      tags: ['interceptors', 'http', 'angular'],
      createdAt: new Date('2024-02-05'),
      codeExamples: [
        {
          title: 'Auth Interceptor',
          code: `
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({ setHeaders: { Authorization: 'Bearer token' } });
    return next.handle(authReq);
  }
}`
        }
      ],
      relatedLinks: [
        { title: 'HTTP Interceptors', url: 'https://angular.io/guide/http-interceptors' }
      ],
      framework: 'angular'
    },
    {
      id: 17,
      title: 'Angular Animations Basics',
      content: `
    <p>Angular animations bring your UI to life with transitions and effects.</p>
    
    <h3>Key Concepts</h3>
    <p>Use <code>@angular/animations</code> to define triggers, states, and transitions.</p>
  `,
      category: 'Angular UI',
      tags: ['animations', 'ui', 'angular'],
      createdAt: new Date('2024-02-10'),
      codeExamples: [
        {
          title: 'Fade Animation',
          code: `
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate('500ms')])
    ])
  ]
})
export class FadeComponent {
  // Template: <div [@fade]>Content</div>
}`
        }
      ],
      relatedLinks: [
        { title: 'Angular Animations', url: 'https://angular.io/guide/animations' }
      ],
      framework: 'angular'
    },
    {
      id: 18,
      title: 'Angular Testing with Jasmine and Karma',
      content: `
    <p>Angular comes with built-in tools for unit testing using Jasmine and Karma.</p>
    
    <h3>Setup</h3>
    <p>Tests are written in spec files and run via the Angular CLI.</p>
  `,
      category: 'Angular Testing',
      tags: ['testing', 'jasmine', 'karma', 'angular'],
      createdAt: new Date('2024-02-15'),
      codeExamples: [
        {
          title: 'Component Test',
          code: `
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent]
    });
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});`
        }
      ],
      relatedLinks: [
        { title: 'Angular Testing Guide', url: 'https://angular.io/guide/testing' }
      ],
      framework: 'angular'
    },
    {
      id: 19,
      title: 'Angular Dependency Injection Hierarchy',
      content: `
    <p>Angular’s DI system provides services at different levels of the application.</p>
    
    <h3>Scopes</h3>
    <ul>
      <li><strong>Root</strong>: Singleton across the app</li>
      <li><strong>Component</strong>: New instance per component</li>
    </ul>
  `,
      category: 'Angular Services',
      tags: ['dependency injection', 'services', 'scope', 'angular'],
      createdAt: new Date('2024-02-20'),
      codeExamples: [
        {
          title: 'Component-Scoped Service',
          code: `
@Component({
  selector: 'app-root',
  providers: [MyService]
})
export class AppComponent {
  constructor(private service: MyService) {}
}`
        }
      ],
      relatedLinks: [
        { title: 'Dependency Injection in Angular', url: 'https://angular.io/guide/dependency-injection' }
      ],
      framework: 'angular'
    },
    {
      id: 20,
      title: 'Angular Universal for Server-Side Rendering',
      content: `
    <p>Angular Universal enables server-side rendering (SSR) for better SEO and initial load performance.</p>
    
    <h3>Benefits</h3>
    <ul>
      <li>Faster first contentful paint</li>
      <li>Improved search engine indexing</li>
    </ul>
  `,
      category: 'Angular Advanced',
      tags: ['ssr', 'universal', 'performance', 'angular'],
      createdAt: new Date('2024-02-25'),
      codeExamples: [
        {
          title: 'Basic SSR Setup',
          code: `
ng add @nguniversal/express-engine`
        }
      ],
      relatedLinks: [
        { title: 'Angular Universal Guide', url: 'https://angular.io/guide/universal' }
      ],
      framework: 'angular'
    },
    {
      id: 21,
      title: 'Angular Dynamic Components',
      content: `
    <p>Dynamic components in Angular allow you to create and render components at runtime.</p>
    
    <h3>Use Cases</h3>
    <ul>
      <li>Modals or popups</li>
      <li>Custom dashboards</li>
    </ul>
    
    <h3>Implementation</h3>
    <p>Use <code>ComponentFactoryResolver</code> or the newer <code>ViewContainerRef.createComponent</code>.</p>
  `,
      category: 'Angular Advanced',
      tags: ['dynamic components', 'runtime', 'angular'],
      createdAt: new Date('2024-03-01'),
      codeExamples: [
        {
          title: 'Dynamic Component Creation',
          code: `
import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  template: '<ng-container #container></ng-container>'
})
export class DynamicComponent {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor() {}

  async loadComponent() {
    const { ChildComponent } = await import('./child.component');
    this.container.createComponent(ChildComponent);
  }
}`
        }
      ],
      relatedLinks: [
        { title: 'Dynamic Components in Angular', url: 'https://angular.io/guide/dynamic-component-loader' }
      ],
      framework: 'angular'
    },
    {
      id: 22,
      title: 'Angular Standalone Components',
      content: `
    <p>Standalone components in Angular (introduced in Angular 14) simplify development by removing the need for NgModules.</p>
    
    <h3>Benefits</h3>
    <ul>
      <li>Reduced boilerplate</li>
      <li>Easier testing</li>
    </ul>
  `,
      category: 'Angular Core Concepts',
      tags: ['standalone', 'components', 'angular'],
      createdAt: new Date('2024-03-05'),
      codeExamples: [
        {
          title: 'Standalone Component',
          code: `
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [CommonModule],
  template: '<p>Hello from standalone!</p>'
})
export class StandaloneComponent {}
`
        }
      ],
      relatedLinks: [
        { title: 'Standalone Components', url: 'https://angular.io/guide/standalone-components' }
      ],
      framework: 'angular'
    },
    {
      id: 23,
      title: 'Angular Signals: A New Reactive Primitive',
      content: `
    <p>Signals (introduced in Angular 16) offer a new way to handle reactivity without Observables.</p>
    
    <h3>How They Work</h3>
    <p>Signals are reactive values that trigger updates when changed.</p>
  `,
      category: 'Angular RxJS',
      tags: ['signals', 'reactivity', 'angular'],
      createdAt: new Date('2024-03-10'),
      codeExamples: [
        {
          title: 'Using Signals',
          code: `
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  template: '{{ count() }}'
})
export class SignalComponent {
  count = signal(0);

  increment() {
    this.count.update(value => value + 1);
  }
}`
        }
      ],
      relatedLinks: [
        { title: 'Angular Signals', url: 'https://angular.io/guide/signals' }
      ],
      framework: 'angular'
    },
    {
      id: 24,
      title: 'Angular Custom Validators',
      content: `
    <p>Custom validators in Angular allow you to define specific validation logic for forms.</p>
    
    <h3>Reactive Forms</h3>
    <p>Create functions that return validation errors.</p>
  `,
      category: 'Angular Forms',
      tags: ['validators', 'forms', 'angular'],
      createdAt: new Date('2024-03-15'),
      codeExamples: [
        {
          title: 'Custom Validator',
          code: `
import { AbstractControl, ValidationErrors } from '@angular/forms';

function forbiddenNameValidator(control: AbstractControl): ValidationErrors | null {
  return control.value === 'admin' ? { forbiddenName: true } : null;
}

@Component({...})
export class MyComponent {
  form = new FormGroup({
    username: new FormControl('', forbiddenNameValidator)
  });
}`
        }
      ],
      relatedLinks: [
        { title: 'Custom Validators', url: 'https://angular.io/guide/form-validation#custom-validators' }
      ],
      framework: 'angular'
    },
    {
      id: 25,
      title: 'Angular Content Projection with ng-content',
      content: `
    <p>Content projection allows you to pass content into a component from its parent.</p>
    
    <h3>Single vs Multi-Slot</h3>
    <p>Use <code>ng-content</code> for single projection or with <code>select</code> for multiple slots.</p>
  `,
      category: 'Angular Core Concepts',
      tags: ['content projection', 'ng-content', 'angular'],
      createdAt: new Date('2024-03-20'),
      codeExamples: [
        {
          title: 'Multi-Slot Projection',
          code: `
@Component({
  selector: 'app-card',
  template: \`
    <div>
      <ng-content select=".header"></ng-content>
      <ng-content select=".body"></ng-content>
    </div>
  \`
})
export class CardComponent {}

<!-- Usage -->
<app-card>
  <div class="header">Title</div>
  <div class="body">Content</div>
</app-card>`
        }
      ],
      relatedLinks: [
        { title: 'Content Projection', url: 'https://angular.io/guide/content-projection' }
      ],
      framework: 'angular'
    },
    {
      id: 26,
      title: 'Angular Web Workers for Performance',
      content: `
    <p>Web Workers in Angular offload heavy computations to a separate thread.</p>
    
    <h3>Setup</h3>
    <p>Use Angular CLI to generate a worker.</p>
  `,
      category: 'Angular Performance',
      tags: ['web workers', 'performance', 'angular'],
      createdAt: new Date('2024-03-25'),
      codeExamples: [
        {
          title: 'Web Worker Example',
          code: `
ng generate web-worker my-worker

// my-worker.worker.ts
addEventListener('message', ({ data }) => {
  const result = heavyComputation(data);
  postMessage(result);
});

// Component
const worker = new Worker(new URL('./my-worker.worker', import.meta.url));
worker.onmessage = ({ data }) => console.log(data);
worker.postMessage(42);`
        }
      ],
      relatedLinks: [
        { title: 'Web Workers in Angular', url: 'https://angular.io/guide/web-worker' }
      ],
      framework: 'angular'
    },
    {
      id: 27,
      title: 'Angular Custom Directives',
      content: `
    <p>Custom directives in Angular add behavior to elements without templates.</p>
    
    <h3>Types</h3>
    <ul>
      <li>Attribute directives</li>
      <li>Structural directives</li>
    </ul>
  `,
      category: 'Angular Core Concepts',
      tags: ['directives', 'custom', 'angular'],
      createdAt: new Date('2024-03-30'),
      codeExamples: [
        {
          title: 'Highlight Directive',
          code: `
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}

// Usage: <p appHighlight>Text</p>`
        }
      ],
      relatedLinks: [
        { title: 'Custom Directives', url: 'https://angular.io/guide/attribute-directives' }
      ],
      framework: 'angular'
    },
    {
      id: 28,
      title: 'Angular Internationalization (i18n)',
      content: `
    <p>Angular’s i18n tools help you build apps for multiple languages.</p>
    
    <h3>Process</h3>
    <p>Mark text with <code>i18n</code> attributes and extract for translation.</p>
  `,
      category: 'Angular Advanced',
      tags: ['i18n', 'internationalization', 'angular'],
      createdAt: new Date('2024-04-05'),
      codeExamples: [
        {
          title: 'i18n Example',
          code: `
<h1 i18n="@@greeting">Hello, world!</h1>

// Extract: ng extract-i18n`
        }
      ],
      relatedLinks: [
        { title: 'Angular i18n', url: 'https://angular.io/guide/i18n' }
      ],
      framework: 'angular'
    },
    {
      id: 29,
      title: 'Angular Micro Frontends',
      content: `
    <p>Micro frontends in Angular allow independent teams to work on separate parts of an app.</p>
    
    <h3>Approach</h3>
    <p>Use Module Federation or iframe-based solutions.</p>
  `,
      category: 'Angular Advanced',
      tags: ['micro frontends', 'architecture', 'angular'],
      createdAt: new Date('2024-04-10'),
      codeExamples: [
        {
          title: 'Module Federation Setup',
          code: `
// webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      exposes: {
        './Component': './src/app.component.ts'
      }
    })
  ]
};`
        }
      ],
      relatedLinks: [
        { title: 'Micro Frontends with Angular', url: 'https://angular.io/guide/module-federation' }
      ],
      framework: 'angular'
    },
    {
      id: 30,
      title: 'Angular CLI Tips and Tricks',
      content: `
    <p>The Angular CLI streamlines development with powerful commands.</p>
    
    <h3>Useful Commands</h3>
    <ul>
      <li><code>ng generate</code>: Scaffolds components</li>
      <li><code>ng build --watch</code>: Auto-rebuilds</li>
    </ul>
  `,
      category: 'Angular Tools',
      tags: ['cli', 'tools', 'angular'],
      createdAt: new Date('2024-04-15'),
      codeExamples: [
        {
          title: 'Generate Component',
          code: `
ng generate component my-component --standalone`
        }
      ],
      relatedLinks: [
        { title: 'Angular CLI', url: 'https://angular.io/cli' }
      ],
      framework: 'angular'
    },
    {
      id: 21,
      title: 'React Prop Drilling Solutions',
      content: `
        <p>Prop drilling occurs when props are passed through multiple component layers. Here’s how to avoid it.</p>
        
        <h3>Solutions</h3>
        <ul>
          <li>Context API</li>
          <li>Redux</li>
          <li>Component Composition</li>
        </ul>
      `,
      category: 'React Core Concepts',
      tags: ['prop drilling', 'state', 'react'],
      createdAt: new Date('2024-03-01'),
      codeExamples: [
        {
          title: 'Composition Example',
          code: `
    function Parent({ children }) {
      const data = "Hello";
      return <div>{children(data)}</div>;
    }
    
    function Child({ data }) {
      return <p>{data}</p>;
    }
    
    function App() {
      return <Parent>{data => <Child data={data} />}</Parent>;
    }`
        }
      ],
      relatedLinks: [
        { title: 'Avoiding Prop Drilling', url: 'https://react.dev/learn/passing-data-deeply-with-context' }
      ],
      framework: 'react'
    },
    {
      id: 22,
      title: 'React useReducer for Complex State',
      content: `
        <p><code>useReducer</code> is an alternative to <code>useState</code> for managing complex state logic.</p>
        
        <h3>When to Use</h3>
        <p>Ideal for state with multiple sub-values or dependent updates.</p>
      `,
      category: 'React Hooks',
      tags: ['useReducer', 'state', 'react'],
      createdAt: new Date('2024-03-05'),
      codeExamples: [
        {
          title: 'useReducer Example',
          code: `
    import { useReducer } from 'react';
    
    const initialState = { count: 0, step: 1 };
    
    function reducer(state, action) {
      switch (action.type) {
        case 'increment': return { ...state, count: state.count + state.step };
        case 'setStep': return { ...state, step: action.step };
        default: return state;
      }
    }
    
    function Counter() {
      const [state, dispatch] = useReducer(reducer, initialState);
      return (
        <>
          <p>Count: {state.count}</p>
          <input
            type="number"
            value={state.step}
            onChange={e => dispatch({ type: 'setStep', step: Number(e.target.value) })}
          />
          <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
        </>
      );
    }`
        }
      ],
      relatedLinks: [
        { title: 'useReducer Hook', url: 'https://react.dev/reference/react/useReducer' }
      ],
      framework: 'react'
    },
    {
      id: 23,
      title: 'React Static Site Generation with Next.js',
      content: `
        <p>Next.js enables static site generation (SSG) for React apps, improving performance and SEO.</p>
        
        <h3>How It Works</h3>
        <p>Use <code>getStaticProps</code> to fetch data at build time.</p>
      `,
      category: 'React Advanced',
      tags: ['ssg', 'next.js', 'react'],
      createdAt: new Date('2024-03-10'),
      codeExamples: [
        {
          title: 'SSG with Next.js',
          code: `
    export async function getStaticProps() {
      const data = await fetch('https://api.example.com').then(res => res.json());
      return { props: { data } };
    }
    
    function Page({ data }) {
      return <pre>{JSON.stringify(data)}</pre>;
    }
    
    export default Page;`
        }
      ],
      relatedLinks: [
        { title: 'Next.js SSG', url: 'https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props' }
      ],
      framework: 'react'
    },
    {
      id: 24,
      title: 'React Form Handling with Formik',
      content: `
        <p>Formik simplifies form management in React with validation and submission handling.</p>
        
        <h3>Features</h3>
        <ul>
          <li>State management</li>
          <li>Validation</li>
        </ul>
      `,
      category: 'React Forms',
      tags: ['formik', 'forms', 'react'],
      createdAt: new Date('2024-03-15'),
      codeExamples: [
        {
          title: 'Formik Example',
          code: `
    import { Formik, Form, Field } from 'formik';
    
    function MyForm() {
      return (
        <Formik
          initialValues={{ email: '' }}
          onSubmit={values => console.log(values)}
        >
          <Form>
            <Field name="email" type="email" />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      );
    }`
        }
      ],
      relatedLinks: [
        { title: 'Formik Documentation', url: 'https://formik.org/docs/overview' }
      ],
      framework: 'react'
    },
    {
      id: 25,
      title: 'React Animation with Framer Motion',
      content: `
        <p>Framer Motion adds smooth animations to React components.</p>
        
        <h3>Basics</h3>
        <p>Use the <code>motion</code> component to animate elements.</p>
      `,
      category: 'React UI',
      tags: ['animations', 'framer-motion', 'react'],
      createdAt: new Date('2024-03-20'),
      codeExamples: [
        {
          title: 'Fade Animation',
          code: `
    import { motion } from 'framer-motion';
    
    function AnimatedBox() {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Hello!
        </motion.div>
      );
    }`
        }
      ],
      relatedLinks: [
        { title: 'Framer Motion', url: 'https://www.framer.com/motion/' }
      ],
      framework: 'react'
    },
    {
      id: 26,
      title: 'React TypeScript Integration',
      content: `
        <p>TypeScript enhances React with static typing for better code quality.</p>
        
        <h3>Setup</h3>
        <p>Add TypeScript to an existing React project or start with a template.</p>
      `,
      category: 'React Tools',
      tags: ['typescript', 'types', 'react'],
      createdAt: new Date('2024-03-25'),
      codeExamples: [
        {
          title: 'Typed Component',
          code: `
    import React, { FC } from 'react';
    
    interface Props {
      name: string;
    }
    
    const Greeting: FC<Props> = ({ name }) => {
      return <h1>Hello, {name}!</h1>;
    };
    
    export default Greeting;`
        }
      ],
      relatedLinks: [
        { title: 'React with TypeScript', url: 'https://react.dev/learn/typescript' }
      ],
      framework: 'react'
    },
    {
      id: 27,
      title: 'React Query for Data Fetching',
      content: `
        <p>React Query simplifies data fetching, caching, and synchronization.</p>
        
        <h3>Features</h3>
        <ul>
          <li>Automatic caching</li>
          <li>Refetching</li>
        </ul>
      `,
      category: 'React Data',
      tags: ['react-query', 'data fetching', 'react'],
      createdAt: new Date('2024-03-30'),
      codeExamples: [
        {
          title: 'Basic Query',
          code: `
    import { useQuery } from '@tanstack/react-query';
    
    function FetchData() {
      const { data, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: () => fetch('https://api.example.com').then(res => res.json())
      });
    
      if (isLoading) return <p>Loading...</p>;
      return <pre>{JSON.stringify(data)}</pre>;
    }`
        }
      ],
      relatedLinks: [
        { title: 'React Query', url: 'https://tanstack.com/query/v5/docs/react/overview' }
      ],
      framework: 'react'
    },
    {
      id: 28,
      title: 'React Micro Frontends with Module Federation',
      content: `
        <p>Module Federation enables micro frontends in React by sharing modules across apps.</p>
        
        <h3>Setup</h3>
        <p>Configure Webpack to expose and consume modules.</p>
      `,
      category: 'React Advanced',
      tags: ['micro frontends', 'module federation', 'react'],
      createdAt: new Date('2024-04-05'),
      codeExamples: [
        {
          title: 'Module Federation Config',
          code: `
    // webpack.config.js
    const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
    
    module.exports = {
      plugins: [
        new ModuleFederationPlugin({
          name: 'app1',
          exposes: {
            './Button': './src/Button'
          }
        })
      ]
    };`
        }
      ],
      relatedLinks: [
        { title: 'Module Federation', url: 'https://webpack.js.org/concepts/module-federation/' }
      ],
      framework: 'react'
    },
    {
      id: 29,
      title: 'React Accessibility (a11y) Best Practices',
      content: `
        <p>Building accessible React apps ensures usability for all users.</p>
        
        <h3>Tips</h3>
        <ul>
          <li>Use semantic HTML</li>
          <li>Add ARIA attributes</li>
        </ul>
      `,
      category: 'React UI',
      tags: ['accessibility', 'a11y', 'react'],
      createdAt: new Date('2024-04-10'),
      codeExamples: [
        {
          title: 'Accessible Button',
          code: `
    function AccessibleButton() {
      return (
        <button aria-label="Close" onClick={() => console.log('Closed')}>
          X
        </button>
      );
    }`
        }
      ],
      relatedLinks: [
        { title: 'React Accessibility', url: 'https://react.dev/learn/accessibility' }
      ],
      framework: 'react'
    },
    {
      id: 30,
      title: 'React Vite for Faster Development',
      content: `
        <p>Vite is a modern build tool that speeds up React development with fast HMR.</p>
        
        <h3>Benefits</h3>
        <ul>
          <li>Instant server start</li>
          <li>Optimized builds</li>
        </ul>
      `,
      category: 'React Tools',
      tags: ['vite', 'build', 'react'],
      createdAt: new Date('2024-04-15'),
      codeExamples: [
        {
          title: 'Create Vite Project',
          code: `
    npm create vite@latest my-react-app -- --template react`
        }
      ],
      relatedLinks: [
        { title: 'Vite Documentation', url: 'https://vitejs.dev/guide/' }
      ],
      framework: 'react'
    }
  ];

  constructor(private frameworkToggleService: FrameworkToggleService) { }

  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  getArticlesByCategory(category: string): Observable<Article[]> {
    return of(this.articles.filter(article => article.category === category));
  }

  getArticlesByTag(tag: string): Observable<Article[]> {
    return of(this.articles.filter(article => article.tags.includes(tag)));
  }

  getArticle(id: number): Observable<Article | undefined> {
    return of(this.articles.find(article => article.id === id));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.articles.map(article => article.category))];
    return of(categories);
  }

  getTags(): Observable<string[]> {
    const tags = [...new Set(this.articles.flatMap(article => article.tags))];
    return of(tags);
  }

  searchArticles(query: string): Observable<Article[]> {
    const lowercaseQuery = query.toLowerCase();
    return of(this.articles.filter(article =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery)
    ));
  }
}