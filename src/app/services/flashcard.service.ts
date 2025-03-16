import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Framework, FrameworkToggleService } from './framework-toggle.service';

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  framework: Framework;
  codeExample?: string;
  explanation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private flashcards: Flashcard[] = [
    
    {
      id: 1,
      question: 'What is Angular?',
      answer: 'Angular is a TypeScript-based, open-source framework for web application development.',
      category: 'Basics',
      difficulty: 'beginner',
      framework: 'angular',
      explanation: 'Angular is a platform developed by Google that helps create single-page applications (SPA). It heavily relies on component-based architecture.'
    },
    {
      id: 2,
      question: 'What is the difference between Angular and AngularJS?',
      answer: 'AngularJS (1.x) was the first version of the framework, while Angular (2+) is a completely rewritten version that is TypeScript-based and component-oriented.',
      category: 'Basics',
      difficulty: 'beginner',
      framework: 'angular'
    },
    {
      id: 3,
      question: 'What is a component in Angular?',
      answer: 'A component is Angular\'s fundamental building block that controls a part of the user interface.',
      category: 'Components',
      difficulty: 'beginner',
      framework: 'angular',
      codeExample: `@Component({
  selector: 'app-example',
  template: '<h1>Hello, {{name}}</h1>',
  styles: ['h1 { color: blue; }']
})
export class ExampleComponent {
  name = 'World';
}`
    },
    {
      id: 4,
      question: 'What is the @Component decorator used for?',
      answer: 'The @Component decorator marks a class as an Angular component and configures its behavior.',
      category: 'Components',
      difficulty: 'beginner',
      framework: 'angular',
      codeExample: `@Component({
  selector: 'app-example',    
  templateUrl: './example.component.html',    
  styleUrls: ['./example.component.css']    
})`
    },
    {
      id: 5,
      question: 'What is the difference between template and templateUrl?',
      answer: 'The template defines HTML code directly in the decorator, while templateUrl points to an external HTML file.',
      category: 'Components',
      difficulty: 'beginner',
      framework: 'angular',
      codeExample: `
@Component({
  template: '<h1>Hello World</h1>'
})


@Component({
  templateUrl: './example.component.html'
})`
    },
    {
      id: 6,
      question: 'What is interpolation in Angular?',
      answer: 'Interpolation is displaying component data in the view, enclosed in double curly braces.',
      category: 'Data Binding',
      difficulty: 'beginner',
      framework: 'angular',
      codeExample: `<h1>Hello, {{name}}</h1>`,
      explanation: 'Interpolation ({{...}}) provides one-way data binding from component data to the DOM.'
    },
    {
      id: 7,
      question: 'What is property binding in Angular?',
      answer: 'Property binding binds a DOM element property to a component property.',
      category: 'Data Binding',
      difficulty: 'beginner',
      framework: 'angular',
      codeExample: `<img [src]="imageUrl">`,
      explanation: 'The square bracket syntax ([property]="expression") provides one-way data binding from component data to a DOM element property.'
    },
    {
      id: 8,
      question: 'What is event binding in Angular?',
      answer: 'Event binding allows you to respond to DOM events.',
      category: 'Data Binding',
      difficulty: 'beginner',
      framework: 'angular',
      codeExample: `<button (click)="onClick()">Click me</button>`,
      explanation: 'The parenthesis syntax ((event)="handler()") provides one-way binding from DOM events to the component.'
    },
    {
      id: 9,
      question: 'What is two-way data binding in Angular?',
      answer: 'Two-way data binding simultaneously binds component data to the view and view changes back to the component.',
      category: 'Data Binding',
      difficulty: 'beginner',
      framework: 'angular',
      codeExample: `<input [(ngModel)]="name">`,
      explanation: 'The [(ngModel)] is the banana-in-a-box syntax that combines property binding ([ngModel]) and event binding (ngModelChange).'
    },
    {
      id: 10,
      question: 'What is the ngIf directive used for?',
      answer: 'The ngIf conditionally adds or removes an element from the DOM based on the given condition.',
      category: 'Directives',
      difficulty: 'beginner',
      framework: 'angular',
      codeExample: `<div *ngIf="isVisible">This is visible if isVisible is true</div>`,
      explanation: 'The * character indicates that it is a structural directive that modifies the DOM structure.'
    },
    {
      id: 11,
      question: 'What is the ngFor directive used for?',
      answer: 'The ngFor repeats an element for each item in a list or iterable object.',
      category: 'Directives',
      difficulty: 'beginner',
      framework: 'angular',
      codeExample: `<li *ngFor="let item of items">{{item.name}}</li>`,
      explanation: 'ngFor also supports complex syntax: let i=index, trackBy, first, last, even, odd'
    },
    {
      id: 12,
      question: 'What is the difference between a directive and a component?',
      answer: 'A component is a special directive with its own view, while general directives don\'t have their own template.',
      category: 'Directives',
      difficulty: 'intermediate',
      framework: 'angular',
      explanation: 'Angular recognizes three types of directives: components (with their own view), structural directives (modify DOM structure, e.g., *ngIf), and attribute directives (modify the appearance or behavior of a DOM element).'
    },
    {
      id: 13,
      question: 'What is Angular Dependency Injection used for?',
      answer: 'Dependency Injection (DI) is a design pattern that allows dependencies (services) to be externally injected into components.',
      category: 'Services',
      difficulty: 'intermediate',
      framework: 'angular',
      codeExample: `constructor(private service: MyService) { }`,
      explanation: 'DI helps in code modularization, testability, and reusability.'
    },
    {
      id: 14,
      question: 'What is an Angular service used for?',
      answer: 'Services provide shared functionality between different parts of the application.',
      category: 'Services',
      difficulty: 'intermediate',
      framework: 'angular',
      codeExample: `@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() { return [...]; }
}`,
      explanation: 'Services are excellent tools for sharing data, storing business logic, and communicating with external APIs.'
    },
    {
      id: 15,
      question: 'What is Angular Router?',
      answer: 'Angular Router allows navigation between different views of the application based on URL.',
      category: 'Routing',
      difficulty: 'intermediate',
      framework: 'angular',
      codeExample: `const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];`,
      explanation: 'Router helps create a single-page application (SPA) that displays different components for different URLs.'
    },
    
    
    {
      id: 101,
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces, particularly single-page applications.',
      category: 'Basics',
      difficulty: 'beginner',
      framework: 'react',
      explanation: 'React was developed and is maintained by Facebook. It allows developers to create large web applications that can change data without reloading the page.'
    },
    {
      id: 102,
      question: 'What are the key features of React?',
      answer: 'JSX, Virtual DOM, Component-based architecture, Unidirectional data flow, and React Native for mobile development.',
      category: 'Basics',
      difficulty: 'beginner',
      framework: 'react',
      explanation: 'These features make React efficient and flexible for building modern user interfaces.'
    },
    {
      id: 103,
      question: 'What is JSX?',
      answer: 'JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML and allows you to write HTML in your React code.',
      category: 'Basics',
      difficulty: 'beginner',
      framework: 'react',
      codeExample: `const element = <h1>Hello, world!</h1>;`,
      explanation: 'JSX is not required for using React, but it makes the code more readable and expressive.'
    },
    {
      id: 104,
      question: 'What is the Virtual DOM in React?',
      answer: 'The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering performance.',
      category: 'Performance',
      difficulty: 'intermediate',
      framework: 'react',
      explanation: 'When state changes, React creates a new Virtual DOM tree, compares it with the previous one, and updates only the changed parts in the real DOM. This process is called reconciliation.'
    },
    {
      id: 105,
      question: 'What are React components?',
      answer: 'Components are independent, reusable pieces of code that return React elements describing how a section of UI should appear.',
      category: 'Components',
      difficulty: 'beginner',
      framework: 'react',
      codeExample: `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}


class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}`,
      explanation: 'React has two types of components: Function components and Class components.'
    },
    {
      id: 106,
      question: 'What are Props in React?',
      answer: 'Props (short for properties) are read-only inputs to components that allow passing data from parent to child components.',
      category: 'Components',
      difficulty: 'beginner',
      framework: 'react',
      codeExample: `
function App() {
  return <Welcome name="Sara" />;
}


function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
      explanation: 'Props are immutable and help in maintaining one-way data flow.'
    },
    {
      id: 107,
      question: 'What is State in React?',
      answer: 'State is a built-in React object that stores property values that belong to a component and determines how it renders and behaves.',
      category: 'State Management',
      difficulty: 'beginner',
      framework: 'react',
      codeExample: `
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}


function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
      explanation: 'Unlike props, state can be changed. State updates may be asynchronous.'
    },
    {
      id: 108,
      question: 'What are React Hooks?',
      answer: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components.',
      category: 'State Management',
      difficulty: 'intermediate',
      framework: 'react',
      codeExample: `
function Example() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}


function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]); 
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}`,
      explanation: 'Common hooks include useState, useEffect, useContext, and useReducer. They were introduced in React 16.8.'
    },
    {
      id: 109,
      question: 'What is the difference between state and props?',
      answer: 'Props are passed to components and are immutable, while state is managed within the component and can be updated.',
      category: 'Components',
      difficulty: 'beginner',
      framework: 'react',
      explanation: 'Props are used to pass data from parent to child components, while state is used for data that changes over time within a component.'
    },
    {
      id: 110,
      question: 'What is Context API in React?',
      answer: 'Context API provides a way to pass data through the component tree without having to pass props down manually at every level.',
      category: 'State Management',
      difficulty: 'intermediate',
      framework: 'react',
      codeExample: `
const ThemeContext = React.createContext('light');


function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}


function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`,
      explanation: 'Context is primarily used when some data needs to be accessible by many components at different nesting levels.'
    },
    {
      id: 111,
      question: 'What is Redux and when should you use it?',
      answer: 'Redux is a predictable state container for JavaScript apps. Use it for managing global state in large applications with complex state logic.',
      category: 'State Management',
      difficulty: 'advanced',
      framework: 'react',
      codeExample: `
const increment = () => {
  return { type: 'INCREMENT' };
};


function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}


const store = createStore(counterReducer);


function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}`,
      explanation: 'Redux centralizes application state, making state mutations predictable with pure reducers.'
    },
    {
      id: 112,
      question: 'What are the lifecycle methods in React class components?',
      answer: 'Lifecycle methods are special methods that automatically run at different stages of a component\'s life, such as mounting, updating, and unmounting.',
      category: 'Components',
      difficulty: 'intermediate',
      framework: 'react',
      codeExample: `class Example extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    
    console.log('Component mounted');
  }
  
  
  componentDidUpdate(prevProps, prevState) {
    
    if (prevState.count !== this.state.count) {
      console.log('Count changed');
    }
  }
  
  
  componentWillUnmount() {
    
    console.log('Component will unmount');
  }
  
  render() {
    return <div>Count: {this.state.count}</div>;
  }
}`,
      explanation: 'In modern React, useEffect and other hooks replace most lifecycle methods in function components.'
    },
    {
      id: 113,
      question: 'What is the purpose of keys in React lists?',
      answer: 'Keys help React identify which items have changed, been added, or been removed in lists, improving rendering performance.',
      category: 'Performance',
      difficulty: 'beginner',
      framework: 'react',
      codeExample: `function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return <ul>{listItems}</ul>;
}`,
      explanation: 'Keys should be unique among siblings in a list. Using array index as keys can cause issues if the list order changes.'
    },
    {
      id: 114,
      question: 'What are React fragments?',
      answer: 'Fragments let you group a list of children without adding extra nodes to the DOM.',
      category: 'Components',
      difficulty: 'beginner',
      framework: 'react',
      codeExample: `
return (
  <React.Fragment>
    <td>Hello</td>
    <td>World</td>
  </React.Fragment>
);


return (
  <>
    <td>Hello</td>
    <td>World</td>
  </>
);`,
      explanation: 'Fragments can have keys when mapping a collection to a list of fragments.'
    },
    {
      id: 115,
      question: 'What is React Router?',
      answer: 'React Router is a standard library for routing in React applications that allows for dynamic, client-side routing.',
      category: 'Routing',
      difficulty: 'intermediate',
      framework: 'react',
      codeExample: `import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}`,
      explanation: 'React Router keeps your UI in sync with the URL, providing a declarative way to navigate between different components.'
    }
  ];

  constructor(private frameworkToggleService: FrameworkToggleService) {}

  getFlashcards(): Observable<Flashcard[]> {
    const currentFramework = this.frameworkToggleService.getCurrentFramework();
    return of(this.flashcards.filter(card => card.framework === currentFramework));
  }

  getCategories(): Observable<string[]> {
    const currentFramework = this.frameworkToggleService.getCurrentFramework();
    const filteredFlashcards = this.flashcards.filter(card => card.framework === currentFramework);
    const categories = [...new Set(filteredFlashcards.map(card => card.category))];
    return of(categories);
  }

  getFlashcardById(id: number): Observable<Flashcard | undefined> {
    return of(this.flashcards.find(card => card.id === id));
  }
}
