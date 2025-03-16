import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Framework, FrameworkToggleService } from './framework-toggle.service';
import { map } from 'rxjs/operators';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  bugType: string;
  projectFiles: {
    [key: string]: string;
  };
  solution: string;
  hints: string[];
  options: string[];
  correctOption: number;
  framework: Framework;
}

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private challenges: Challenge[] = [
    
{
  id: 42,
  title: 'NgFor Index Error',
  description: 'The index in *ngFor isn’t displaying correctly. Fix the bug!',
  difficulty: 'easy',
  bugType: 'Template',
  projectFiles: {
    'app.component.html': `<ul>
  <li *ngFor="let item of items">{{index}} - {{item}}</li>
</ul>`,
    'app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  items = ['A', 'B', 'C'];
}`
  },
  solution: 'Add "let index = index" to the *ngFor directive: *ngFor="let item of items; let i = index".',
  hints: [
    'The index needs to be explicitly defined in *ngFor',
    'Check the *ngFor syntax for additional variables'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
{
  id: 43,
  title: 'BehaviorSubject Subscription Error',
  description: 'The component doesn’t update when the BehaviorSubject emits a new value.',
  difficulty: 'medium',
  bugType: 'Async Data',
  projectFiles: {
    'data.service.ts': `import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private dataSubject = new BehaviorSubject<string>('Initial');
  data$ = this.dataSubject.asObservable();

  updateData(value: string) {
    this.dataSubject.next(value);
  }
}`,
    'app.component.ts': `import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: '<p>{{data}}</p><button (click)="update()">Update</button>'
})
export class AppComponent {
  data: string;
  constructor(private dataService: DataService) {
    this.data = this.dataService.data$;
  }

  update() {
    this.dataService.updateData('Updated');
  }
}`
  },
  solution: 'Subscribe to the Observable or use the async pipe. Fix: this.dataService.data$.subscribe(value => this.data = value) or <p>{{data$ | async}}</p>.',
  hints: [
    'Observables need to be subscribed to',
    'The async pipe can simplify this',
    'Assigning an Observable directly doesn’t work'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
{
  id: 44,
  title: 'Directive Not Applying',
  description: 'The custom directive isn’t changing the element’s background color.',
  difficulty: 'medium',
  bugType: 'Directive',
  projectFiles: {
    'highlight.directive.ts': `import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}`,
    'app.component.html': `<p appHighlight>Highlighted Text</p>`
  },
  solution: 'Ensure the directive is declared in the NgModule or added to the standalone component’s imports.',
  hints: [
    'Directives need to be registered',
    'Check the imports array in the component or module'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
{
  id: 45,
  title: 'Form Submission Error',
  description: 'The form submits but the data isn’t logged.',
  difficulty: 'easy',
  bugType: 'Form Handling',
  projectFiles: {
    'app.component.html': `<form (ngSubmit)="submit()">
  <input type="text" [(ngModel)]="name" name="name">
  <button type="submit">Submit</button>
</form>`,
    'app.component.ts': `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  name: string;

  submit() {
    console.log(this.name);
  }
}`
  },
  solution: 'The code is correct; ensure the FormsModule is imported and the submit() method is triggered.',
  hints: [
    'Check the ngSubmit binding',
    'Verify FormsModule is in imports'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
{
  id: 46,
  title: 'Pipe Transform Error',
  description: 'The custom pipe doesn’t transform the value as expected.',
  difficulty: 'medium',
  bugType: 'Pipe',
  projectFiles: {
    'reverse.pipe.ts': `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}`,
    'app.component.html': `<p>{{ 'hello' | reverse }}</p>`
  },
  solution: 'Ensure the pipe is declared in the NgModule or imported in the standalone component.',
  hints: [
    'Pipes need to be registered',
    'Check the declarations or imports array'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
{
  id: 47,
  title: 'Component Input Not Updating',
  description: 'The child component doesn’t reflect updates to the input property.',
  difficulty: 'hard',
  bugType: 'Component Communication',
  projectFiles: {
    'parent.component.html': `<app-child [count]="counter"></app-child>
<button (click)="increment()">Increment</button>`,
    'parent.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {
  counter = { value: 0 };

  increment() {
    this.counter.value++;
  }
}`,
    'child.component.ts': `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<p>{{count.value}}</p>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() count: { value: number };
}`
  },
  solution: 'With OnPush, create a new object reference: this.counter = { ...this.counter, value: this.counter.value + 1 };.',
  hints: [
    'OnPush requires reference changes',
    'Mutating an object doesn’t trigger detection'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
{
  id: 48,
  title: 'Router Outlet Missing',
  description: 'The routed component doesn’t appear in the view.',
  difficulty: 'easy',
  bugType: 'Navigation',
  projectFiles: {
    'app.component.html': `<h1>App</h1>`,
    'app-routing.module.ts': `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: 'home', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }`
  },
  solution: 'Add <router-outlet></router-outlet> to app.component.html.',
  hints: [
    'Routing needs an outlet',
    'Check the main template'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
{
  id: 49,
  title: 'Async Validator Error',
  description: 'The async validator doesn’t trigger validation.',
  difficulty: 'medium',
  bugType: 'Form Handling',
  projectFiles: {
    'app.component.ts': `import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<input [formControl]="control">'
})
export class AppComponent {
  control = new FormControl('', null, this.asyncValidator);

  asyncValidator(control: FormControl) {
    return of(control.value === 'valid' ? null : { invalid: true }).pipe(delay(1000));
  }
}`
  },
  solution: 'Bind as a static method: static asyncValidator(control: FormControl), and ensure ReactiveFormsModule is imported.',
  hints: [
    'Async validators need to be static',
    'Check module imports'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
{
  id: 50,
  title: 'NgIf Structural Directive Error',
  description: 'The *ngIf doesn’t hide the element as expected.',
  difficulty: 'easy',
  bugType: 'Conditional Rendering',
  projectFiles: {
    'app.component.html': `<p *ngIf="show">Visible</p>`,
    'app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  show = 'true';
}`
  },
  solution: 'Change show to a boolean: show = true instead of show = \'true\'.',
  hints: [
    '*ngIf expects a boolean',
    'Check the variable type'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
{
  id: 51,
  title: 'Dependency Injection Scope Error',
  description: 'The service instance isn’t shared across components.',
  difficulty: 'hard',
  bugType: 'Service',
  projectFiles: {
    'shared.service.ts': `@Injectable()
export class SharedService {
  counter = 0;
}`,
    'app.component.ts': `import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  template: '<app-child></app-child>',
  providers: [SharedService]
})
export class AppComponent {
  constructor(private service: SharedService) {}
}`,
    'child.component.ts': `import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-child',
  template: '<p>{{service.counter}}</p>'
})
export class ChildComponent {
  constructor(public service: SharedService) {}
}`
  },
  solution: 'Move providedIn: \'root\' to SharedService instead of providing it in the component.',
  hints: [
    'Check where the service is provided',
    'Root scope ensures a singleton'
  ],
  options: [],
  correctOption: 0,
  framework: 'angular'
},
    {
      id: 1,
      title: 'NgModel Error',
      description: 'The input field does not update the model value. Examine the code and find the bug!',
      difficulty: 'easy',
      bugType: 'Form Handling',
      projectFiles: {
        'app.component.html': `<div class="container">
  <h2>Form Example</h2>
  <form>
    <div class="form-group mb-3">
      <label for="name">Name:</label>
      <input 
        type="text" 
        class="form-control" 
        id="name" 
        ngModel 
        name="userName">
    </div>
    <p>Entered name: <strong>{{userName}}</strong></p>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</div>`,
        'app.component.ts': `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName = '';
}`,
        'app.module.ts': `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})`
      },
      solution: 'To use the ngModel directive, the FormsModule must be imported in the AppModule, and the [(ngModel)]="userName" syntax is required for two-way data binding. In the standalone component, the FormsModule is not imported, and the two-way binding syntax is missing.',
      hints: [
        'Check the imports in AppComponent',
        'Two-way data binding requires a specific syntax',
        'The [(ngModel)] is the correct syntax for two-way binding'
      ],
      options: [
        'The FormsModule import is missing from app.module.ts',
        'Use [(ngModel)]="userName" syntax instead of ngModel',
        'The FormsModule must be imported in the standalone component',
        'The form tag is missing the #myForm="ngForm" directive'
      ],
      correctOption: 2,
      framework: 'angular'
    },
    {
      id: 2,
      title: '*ngFor trackBy Error',
      description: 'The list items re-render every time the data updates, causing performance issues. Find the bug and suggest the appropriate fix!',
      difficulty: 'medium',
      bugType: 'Optimization',
      projectFiles: {
        'app.component.html': `<div class="container">
  <h2>User List</h2>
  <p class="text-muted">Every update causes the DOM elements to fully re-render, even if the data hasn’t actually changed.</p>
  
  <button class="btn btn-primary mb-3" (click)="refreshUsers()">Refresh</button>
  
  <div class="mb-3">
    <input type="text" class="form-control" placeholder="New user name" [(ngModel)]="newUserName">
    <button class="btn btn-success mt-2" (click)="addUser()">Add</button>
  </div>
  
  <ul class="list-group">
    <li class="list-group-item d-flex justify-content-between align-items-center" *ngFor="let user of users">
      <div>
        <span class="badge bg-primary rounded-pill me-2">{{ user.id }}</span>
        {{ user.name }}
      </div>
      <button class="btn btn-outline-danger btn-sm" (click)="removeUser(user.id)">Delete</button>
    </li>
  </ul>
  
  <div class="mt-3 alert alert-info">
    <strong>Tip:</strong> Open the browser developer tools and observe the DOM changes when clicking the "Refresh" button.
  </div>
</div>`,
        'app.component.ts': `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [
    { id: 1, name: 'Anna' },
    { id: 2, name: 'Béla' },
    { id: 3, name: 'Cecília' }
  ];
  
  newUserName: string = '';
  nextId: number = 4;
  
  refreshUsers() {
    
    
    this.users = [...this.users];
    console.log('Users refreshed (only new array reference)');
  }
  
  addUser() {
    if (this.newUserName.trim()) {
      this.users.push({ id: this.nextId++, name: this.newUserName });
      this.newUserName = '';
    }
  }
  
  removeUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }
}`,
      },
      solution: 'The *ngFor directive should use a trackBy function to help Angular identify which items are the same in the array, even if the array reference changes. Solution: *ngFor="let user of users; trackBy: trackByUserId", then implement the trackByUserId method in AppComponent: trackByUserId(index: number, user: User): number { return user.id; }.',
      hints: [
        'The *ngFor can use a trackBy parameter',
        'Each item has a unique identifier',
        'Create a trackByUserId function in the component'
      ],
      options: [
        'An Observable should be used instead of the users array',
        'The refreshUsers() method should be removed',
        'A trackBy function should be used with the *ngFor directive',
        'The ChangeDetectionStrategy.OnPush strategy should be set'
      ],
      correctOption: 2,
      framework: 'angular'
    },
    {
      id: 3,
      title: 'Async Pipe Error',
      description: 'Displaying data from an Observable causes an error. The component tries to display data from an Observable, but something isn’t working correctly.',
      difficulty: 'medium',
      bugType: 'Async Data',
      projectFiles: {
        'app.component.html': `<div class="container">
  <h2>Async Data</h2>
  
  <div class="alert alert-info mb-3">
    The data arrives with a 1-second delay (simulated API call).
  </div>
  
  <div class="card" *ngIf="data">
    <div class="card-header">
      <h5>{{ data.title }}</h5>
    </div>
    <div class="card-body">
      <p class="card-text">{{ data.content }}</p>
      <p class="text-muted">Published: {{ data.publishedAt | date:'yyyy. MM. dd. HH:mm' }}</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary" (click)="refreshData()">Refresh</button>
    </div>
  </div>
  
  <div *ngIf="!data" class="mt-3">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <span class="ms-2">Loading data...</span>
  </div>
</div>`,
        'app.component.ts': `import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Post {
  title: string;
  content: string;
  publishedAt: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  data$: Observable<Post>;
  data: Post | null = null;
  loading = false;
  subscription: Subscription | null = null;
  
  ngOnInit() {
    this.loadData();
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  loadData() {
    this.loading = true;
    this.data$ = of({
      title: 'Angular News',
      content: 'Angular 16 includes many new features, such as a new service for dependency injection and improved strict type checking!',
      publishedAt: new Date()
    }).pipe(delay(1000));
    
    
  }
  
  refreshData() {
    this.data = null;
    this.loadData();
  }
}`,
      },
      solution: 'The Observable needs to be evaluated to retrieve the data. Two options: 1) Use the async pipe directly in the template: *ngIf="data$ | async as data", or 2) Subscribe to the Observable in the component: this.subscription = this.data$.subscribe(result => { this.data = result; this.loading = false; });',
      hints: [
        'The Observable value needs to be unwrapped',
        'The async pipe automatically subscribes and unsubscribes',
        'Explicit subscription in the component is also a solution, but unsubscribing must be handled'
      ],
      options: [
        'Use a timer instead of the delay operator',
        'Subscribe to the Observable in the component using the subscribe method',
        'Use the async pipe in the template: *ngIf="data$ | async as data"',
        'Call loadData() in the constructor instead of ngOnInit'
      ],
      correctOption: 1,
      framework: 'angular'
    },
    {
      id: 4,
      title: 'OnPush Change Detection Error',
      description: 'The component does not update when the data changes. Fix the bug!',
      difficulty: 'hard',
      bugType: 'Change Detection',
      projectFiles: {
        'parent.component.html': `<div class="container">
  <h2>Parent Component</h2>
  <button class="btn btn-primary mb-3" (click)="updateCounter()">Increment Counter</button>
  <app-child [counter]="counter"></app-child>
</div>`,
        'parent.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {
  counter = 0;

  updateCounter() {
    this.counter++;
  }
}`,
        'child.component.html': `<div class="card">
  <div class="card-body">
    <h5 class="card-title">Child Component</h5>
    <p class="card-text">Counter value: {{ counter }}</p>
  </div>
</div>`,
        'child.component.ts': `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() counter: any;
}`
      },
      solution: 'With the OnPush change detection strategy, primitive types (like counter) don’t trigger re-rendering because their reference doesn’t change. The solution is to wrap the counter in an object or use ChangeDetectorRef.',
      hints: [
        'OnPush only updates on reference changes',
        'Primitive types are not suitable for OnPush strategy',
        'Use an object or ChangeDetectorRef.markForCheck() method'
      ],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 5,
      title: 'ViewChild Initialization Error',
      description: 'The ViewChild reference isn’t working properly. Fix the bug!',
      difficulty: 'medium',
      bugType: 'Lifecycle',
      projectFiles: {
        'app.component.html': `<div class="container">
  <h2>ViewChild Example</h2>
  <div class="alert alert-info" #messageBox>This is a message!</div>
  <button class="btn btn-primary" (click)="changeMessage()">Change Message</button>
</div>`,
        'app.component.ts': `import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('messageBox') messageBox: ElementRef;

  ngOnInit() {
    this.setInitialMessage();
  }

  setInitialMessage() {
    this.messageBox.nativeElement.textContent = 'Initial message';
  }

  changeMessage() {
    this.messageBox.nativeElement.textContent = 'Modified message - ' + new Date().toLocaleTimeString();
  }
}`,
      },
      solution: 'The ViewChild is only available in the AfterViewInit lifecycle hook, so the setInitialMessage() method should be called in ngAfterViewInit(), not ngOnInit().',
      hints: [
        'Check when ViewChild is initialized',
        'ngOnInit() is too early for DOM references',
        'ngAfterViewInit() is the appropriate hook for ViewChild usage'
      ],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 6,
      title: 'Error Using Reactive Forms',
      description: 'Reactive Forms do not update the view when the model changes.',
      difficulty: 'medium',
      bugType: 'Form Handling',
      projectFiles: {
        'app.component.html': `<form [formGroup]="form">
  <input formControlName="name" />
</form>`,
        'app.component.ts': `import { FormGroup, FormBuilder } from '@angular/forms';
export class AppComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['']
    });
  }
}`
      },
      solution: 'Check that the formControl and formGroup are properly initialized.',
      hints: ['Verify the FormGroup initialization', 'Use ReactiveFormsModule in the AppModule'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 7,
      title: 'Error During Service Injection',
      description: 'The service is not accessible in the component.',
      difficulty: 'easy',
      bugType: 'Service',
      projectFiles: {
        'app.component.ts': `import { MyService } from './my.service';
export class AppComponent {
  constructor(private myService: MyService) {}
}`
      },
      solution: 'Check that the service is registered in the AppModule.',
      hints: ['Verify the service import', 'Ensure the service is in the providers array'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 8,
      title: 'Error Using Pipe',
      description: 'The pipe does not work as expected.',
      difficulty: 'easy',
      bugType: 'Pipe',
      projectFiles: {
        'app.component.html': `<p>{{ value | myCustomPipe }}</p>`,
        'my-custom.pipe.ts': `import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'myCustomPipe' })
export class MyCustomPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}`
      },
      solution: 'Check that the pipe is properly imported.',
      hints: ['Ensure the pipe is in the declarations array', 'Verify the pipe name in the template'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 9,
      title: 'Error in Lifecycle Hooks',
      description: 'The ngOnInit is not being called.',
      difficulty: 'medium',
      bugType: 'Lifecycle',
      projectFiles: {
        'app.component.ts': `export class AppComponent implements OnInit {
  ngOnInit() {
    console.log('Init');
  }
}`
      },
      solution: 'Check that the component is properly initialized.',
      hints: ['Ensure the OnInit interface is implemented', 'Verify the component registration'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 10,
      title: 'Error Using NgIf',
      description: 'The NgIf does not work as expected.',
      difficulty: 'easy',
      bugType: 'Conditional Rendering',
      projectFiles: {
        'app.component.html': `<div *ngIf="isVisible">Visible</div>`,
        'app.component.ts': `export class AppComponent {
  isVisible = true;
}`
      },
      solution: 'Check that the condition is correct.',
      hints: ['Ensure the variable is accessible in the template', 'Verify the condition logic'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 11,
      title: 'Error Using NgSwitch',
      description: 'The NgSwitch does not switch as expected.',
      difficulty: 'medium',
      bugType: 'Conditional Rendering',
      projectFiles: {
        'app.component.html': `<div [ngSwitch]="value">
  <div *ngSwitchCase="1">One</div>
  <div *ngSwitchCase="2">Two</div>
</div>`,
        'app.component.ts': `export class AppComponent {
  value = 1;
}`
      },
      solution: 'Check that the switch expression is correct.',
      hints: ['Ensure the expression is of the correct type', 'Verify the switch cases'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 12,
      title: 'Error Initializing FormGroup',
      description: 'The FormGroup does not initialize properly.',
      difficulty: 'medium',
      bugType: 'Form Handling',
      projectFiles: {
        'app.component.ts': `import { FormGroup, FormBuilder } from '@angular/forms';
export class AppComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['']
    });
  }
}`
      },
      solution: 'Check that the FormGroup is correctly defined.',
      hints: ['Ensure the FormBuilder is imported', 'Verify the formControl name'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 13,
      title: 'Error Using HttpClient',
      description: 'The HTTP request does not work.',
      difficulty: 'medium',
      bugType: 'HTTP',
      projectFiles: {
        'app.component.ts': `import { HttpClient } from '@angular/common/http';
export class AppComponent {
  constructor(private http: HttpClient) {
    this.http.get('/api/data').subscribe(data => console.log(data));
  }
}`
      },
      solution: 'Check that the correct URL is being used.',
      hints: ['Ensure the API is accessible', 'Verify CORS settings'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 14,
      title: 'Error Combining NgModel and FormControl',
      description: 'Two-way data binding does not work.',
      difficulty: 'medium',
      bugType: 'Form Handling',
      projectFiles: {
        'app.component.html': `<input [(ngModel)]="name" />`,
        'app.component.ts': `export class AppComponent {
  name = '';
}`
      },
      solution: 'Check that the [(ngModel)] syntax is correct.',
      hints: ['Ensure the FormsModule is imported', 'Verify the variable name'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 15,
      title: 'Error Using Custom Pipe',
      description: 'The custom pipe does not return the expected value.',
      difficulty: 'medium',
      bugType: 'Pipe',
      projectFiles: {
        'my-custom.pipe.ts': `import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'myCustomPipe' })
export class MyCustomPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}`
      },
      solution: 'Check that the pipe logic is correct.',
      hints: ['Ensure the pipe is in the declarations array', 'Verify the pipe name in the template'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 16,
      title: 'Error Using RouterLink',
      description: 'Navigation does not work.',
      difficulty: 'easy',
      bugType: 'Navigation',
      projectFiles: {
        'app.component.html': `<a [routerLink]="['/home']">Home</a>`,
        'app-routing.module.ts': `const routes: Routes = [
  { path: 'home', component: HomeComponent }
];`
      },
      solution: 'Check that the RouterLink is correctly defined.',
      hints: ['Ensure the RouterModule is imported', 'Verify the routes'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 17,
      title: 'Error Using Route Guard',
      description: 'The route guard does not work.',
      difficulty: 'medium',
      bugType: 'Navigation',
      projectFiles: {
        'auth.guard.ts': `import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate() {
    return true; 
  }
}`
      },
      solution: 'Check that the guard is properly implemented.',
      hints: ['Ensure the guard is in the providers array', 'Verify the guard logic'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 18,
      title: 'Error Using Lazy Loading',
      description: 'The module does not load lazily.',
      difficulty: 'medium',
      bugType: 'Module',
      projectFiles: {
        'app-routing.module.ts': `const routes: Routes = [
  { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) }
];`
      },
      solution: 'Check that lazy loading is correctly configured.',
      hints: ['Ensure the module is exported', 'Verify the routes'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 19,
      title: 'Error Importing NgModule',
      description: 'The module is not accessible.',
      difficulty: 'easy',
      bugType: 'Module',
      projectFiles: {
        'app.module.ts': `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}`
      },
      solution: 'Check that the module is properly imported.',
      hints: ['Ensure the module is in the declarations array', 'Verify the module name'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 20,
      title: 'Error Using NgClass',
      description: 'Dynamic classes do not work.',
      difficulty: 'easy',
      bugType: 'Styling',
      projectFiles: {
        'app.component.html': `<div [ngClass]="{'active': isActive}">Active</div>`,
        'app.component.ts': `export class AppComponent {
  isActive = true;
}`
      },
      solution: 'Check that the condition is correct.',
      hints: ['Ensure the variable is accessible in the template', 'Verify the condition logic'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 21,
      title: 'Router Parameter Error',
      description: 'Route parameters are not accessible in the component.',
      difficulty: 'medium',
      bugType: 'Navigation',
      projectFiles: {
        'app.component.ts': `import { ActivatedRoute } from '@angular/router';
export class AppComponent {
  constructor(private route: ActivatedRoute) {
    console.log(this.route.snapshot.params['id']);
  }
}`,
        'app-routing.module.ts': `const routes: Routes = [{ path: 'item/:id', component: AppComponent }];`
      },
      solution: 'Use subscribe to monitor parameters: this.route.params.subscribe(params => console.log(params[\'id\']));',
      hints: ['The snapshot only provides a static value', 'Params is an Observable', 'Subscription is needed for dynamic changes'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 22,
      title: 'NgClass Condition Error',
      description: 'Dynamic classes do not update correctly.',
      difficulty: 'easy',
      bugType: 'Styling',
      projectFiles: {
        'app.component.html': `<div [ngClass]="isActive ? 'active' : 'inactive'">Content</div>`,
        'app.component.ts': `export class AppComponent {
  isActive = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }
}`
      },
      solution: 'The code is correct, but check that toggleActive() is called from an event, e.g., (click)="toggleActive()".',
      hints: ['Verify the event binding', 'The logic is fine, the trigger might be the issue'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 23,
      title: 'HTTP Interceptor Error',
      description: 'The interceptor does not add headers to requests.',
      difficulty: 'medium',
      bugType: 'HTTP',
      projectFiles: {
        'auth.interceptor.ts': `import { HttpInterceptor, HttpRequest } from '@angular/common/http';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next) {
    const authReq = req.clone({ setHeaders: { Authorization: 'Bearer token' } });
    return next.handle(authReq);
  }
}`
      },
      solution: 'Register the interceptor in the AppModule with the HTTP_INTERCEPTORS token.',
      hints: ['Check the providers array', 'For multiple interceptors, multi: true is required'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 24,
      title: 'NgIf Else Branch Error',
      description: 'The else branch does not appear.',
      difficulty: 'easy',
      bugType: 'Conditional Rendering',
      projectFiles: {
        'app.component.html': `<div *ngIf="isVisible; else notVisible">Visible</div>
<ng-template #notVisible><div>Not Visible</div></ng-template>`
      },
      solution: 'The code is correct, check that the isVisible variable is false.',
      hints: ['Verify the variable value', 'The ng-template reference is used correctly'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 25,
      title: 'Input Binding Error',
      description: 'The parent component does not pass data to the child.',
      difficulty: 'easy',
      bugType: 'Component Communication',
      projectFiles: {
        'parent.component.html': `<app-child [data]="parentData"></app-child>`,
        'child.component.ts': `export class ChildComponent {
  @Input() data: string;
}`
      },
      solution: 'Check that parentData is defined in the parent.',
      hints: ['The parent needs a parentData variable', 'The @Input decorator is correct'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 26,
      title: 'Output Event Error',
      description: 'The child component event does not reach the parent.',
      difficulty: 'medium',
      bugType: 'Component Communication',
      projectFiles: {
        'child.component.ts': `import { EventEmitter, Output } from '@angular/core';
export class ChildComponent {
  @Output() notify = new EventEmitter<string>();
  sendMessage() {
    this.notify.emit('Message');
  }
}`,
        'parent.component.html': `<app-child (notify)="handleMessage($event)"></app-child>`
      },
      solution: 'Check that the sendMessage() method is called in the child.',
      hints: ['The event binding is correct', 'Trigger the sendMessage()'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 27,
      title: 'Lazy Module Loading Error',
      description: 'The lazy module does not load.',
      difficulty: 'medium',
      bugType: 'Module',
      projectFiles: {
        'app-routing.module.ts': `const routes: Routes = [
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) }
];`
      },
      solution: 'Check that the LazyModule is exported in lazy.module.ts.',
      hints: ['The module must be export class LazyModule', 'Verify the route'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 28,
      title: 'FormArray Error',
      description: 'The FormArray items do not appear.',
      difficulty: 'medium',
      bugType: 'Form Handling',
      projectFiles: {
        'app.component.ts': `import { FormBuilder, FormArray } from '@angular/forms';
export class AppComponent {
  form = this.fb.group({
    items: this.fb.array([])
  });
  constructor(private fb: FormBuilder) {}
}`,
        'app.component.html': `<div formArrayName="items">
  <div *ngFor="let item of form.controls.items.controls">{{item.value}}</div>
</div>`
      },
      solution: 'Add items to the FormArray: (this.form.get(\'items\') as FormArray).push(this.fb.control(\'\'));',
      hints: ['The FormArray is empty', 'Use push to add items'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 29,
      title: 'Custom Validator Error',
      description: 'The custom validator does not work.',
      difficulty: 'medium',
      bugType: 'Form Handling',
      projectFiles: {
        'app.component.ts': `import { FormControl, Validators } from '@angular/forms';
export class AppComponent {
  control = new FormControl('', this.customValidator);
  customValidator(control: FormControl) {
    return control.value === 'valid' ? null : { invalid: true };
  }
}`
      },
      solution: 'Bind the validator as a static method: static customValidator(control: FormControl).',
      hints: ['The validator must be static', 'Check the return value'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 30,
      title: 'NgZone Error',
      description: 'An external event does not update the view.',
      difficulty: 'hard',
      bugType: 'Change Detection',
      projectFiles: {
        'app.component.ts': `export class AppComponent {
  constructor(private ngZone: NgZone) {
    setTimeout(() => this.message = 'Updated', 1000);
  }
  message = '';
}`
      },
      solution: 'Run the code in the NgZone: this.ngZone.run(() => this.message = \'Updated\');',
      hints: ['External events run outside Angular’s zone', 'NgZone helps'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 31,
      title: 'Resolver Error',
      description: 'The route resolver does not load data.',
      difficulty: 'medium',
      bugType: 'Navigation',
      projectFiles: {
        'data.resolver.ts': `import { Resolve } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<string> {
  resolve() {
    return 'Data';
  }
}`
      },
      solution: 'Register the resolver with the route: { path: \'data\', component: AppComponent, resolve: { data: DataResolver } }.',
      hints: ['Check the route configuration', 'Use ActivatedRoute to access data'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 32,
      title: 'NgStyle Error',
      description: 'Dynamic styles do not update.',
      difficulty: 'easy',
      bugType: 'Styling',
      projectFiles: {
        'app.component.html': `<div [ngStyle]="{'color': isRed ? 'red' : 'black'}">Text</div>`,
        'app.component.ts': `export class AppComponent {
  isRed = false;
}`
      },
      solution: 'Add an event that toggles the isRed value.',
      hints: ['The logic is correct', 'Trigger the change'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 33,
      title: 'Change Detection Reference Error',
      description: 'The component does not detect an object change.',
      difficulty: 'hard',
      bugType: 'Change Detection',
      projectFiles: {
        'app.component.ts': `export class AppComponent {
  data = { value: 1 };
  update() {
    this.data.value++;
  }
}`
      },
      solution: 'Create a new object: this.data = { ...this.data, value: this.data.value + 1 };',
      hints: ['The reference doesn’t change', 'A new object is needed'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 34,
      title: 'Template Reference Error',
      description: 'The template reference is not accessible.',
      difficulty: 'medium',
      bugType: 'Template',
      projectFiles: {
        'app.component.html': `<input #myInput><button (click)="logInput(myInput)">Log</button>`,
        'app.component.ts': `export class AppComponent {
  logInput(input) {
    console.log(input.value);
  }
}`
      },
      solution: 'The code is correct, check that the template reference is passed.',
      hints: ['The parameter type is HTMLElement', 'Verify the function call'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 35,
      title: 'NgContainer Error',
      description: 'The ng-container does not render content.',
      difficulty: 'easy',
      bugType: 'Template',
      projectFiles: {
        'app.component.html': `<ng-container *ngIf="true"><p>Content</p></ng-container>`
      },
      solution: 'The code is correct, check that the condition is true.',
      hints: ['ng-container doesn’t add a DOM element', 'Verify the logic'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 36,
      title: 'Service Singleton Error',
      description: 'The service does not function as a singleton.',
      difficulty: 'medium',
      bugType: 'Service',
      projectFiles: {
        'my.service.ts': `@Injectable()
export class MyService {
  value = 0;
}`
      },
      solution: 'Set providedIn: \'root\' in the @Injectable decorator.',
      hints: ['providedIn determines the scope', 'Root ensures a singleton'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 37,
      title: 'RxJS Map Error',
      description: 'The RxJS map operator does not transform the data.',
      difficulty: 'medium',
      bugType: 'Async Data',
      projectFiles: {
        'app.component.ts': `import { of } from 'rxjs';
import { map } from 'rxjs/operators';
export class AppComponent {
  data$ = of(1).pipe(map(x => x + 1));
}`
      },
      solution: 'The code is correct, check that you subscribed to data$.',
      hints: ['The Observable must be evaluated', 'Use async pipe or subscribe'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 38,
      title: 'CanDeactivate Guard Error',
      description: 'The CanDeactivate does not prevent navigation.',
      difficulty: 'medium',
      bugType: 'Navigation',
      projectFiles: {
        'exit.guard.ts': `@Injectable({ providedIn: 'root' })
export class ExitGuard implements CanDeactivate<any> {
  canDeactivate() {
    return confirm('Are you sure you want to navigate away?');
  }
}`
      },
      solution: 'Register the guard with the route: { path: \'edit\', component: AppComponent, canDeactivate: [ExitGuard] }.',
      hints: ['Check the route', 'The confirm logic is fine'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 39,
      title: 'Dynamic Component Error',
      description: 'The dynamically loaded component does not appear.',
      difficulty: 'hard',
      bugType: 'Component',
      projectFiles: {
        'app.component.ts': `import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
export class AppComponent {
  constructor(private resolver: ComponentFactoryResolver, private vcr: ViewContainerRef) {
    const factory = this.resolver.resolveComponentFactory(ChildComponent);
    this.vcr.createComponent(factory);
  }
}`
      },
      solution: 'Add the ChildComponent to entryComponents in the NgModule.',
      hints: ['Dynamic components need entryComponents', 'In Angular 9+ this is optional'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 40,
      title: 'NgPlural Error',
      description: 'Plural rendering does not work.',
      difficulty: 'medium',
      bugType: 'Template',
      projectFiles: {
        'app.component.html': `<div [ngPlural]="count">
  <ng-template ngPluralCase="=1">One item</ng-template>
  <ng-template ngPluralCase="other">Multiple items</ng-template>
</div>`,
        'app.component.ts': `export class AppComponent {
  count = 2;
}`
      },
      solution: 'The code is correct, check that the count value updates properly.',
      hints: ['ngPlural is used correctly', 'Verify the variable value'],
      options: [],
      correctOption: 0,
      framework: 'angular'
    },
    {
      id: 41,
      title: 'ItemList Error',
      description: 'The list does not appear.',
      difficulty: 'medium',
      bugType: 'List',
      projectFiles: {
        'ItemList.js': `import React from 'react';

function ItemList() {
  const items = [
    { name: 'Apple', price: 1.20 },
    { name: 'Banana', price: 0.50 },
    { name: 'Orange', price: 0.80 }
  ];
  
  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {items.map((item) => (
          <li>
            {item.name}: {(item.price).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;`
      },
      solution: 'Check that the list is properly defined.',
      hints: ['Verify the list definition', 'The map function is used correctly'],
      options: [],
      correctOption: 0,
      framework: 'react'
    }
  ];
  
  
  private reactChallenges: Challenge[] = [];

  constructor(private frameworkToggleService: FrameworkToggleService) {
    
    this.challenges = this.challenges.map(challenge => ({
      ...challenge,
      framework: 'angular'
    }));
    
    
    this.initReactChallenges();
    
    
    this.challenges = [...this.challenges, ...this.reactChallenges];
  }

  private initReactChallenges() {
    this.reactChallenges = [
      
{
  id: 121,
  title: 'PropTypes Validation Error',
  description: 'The component doesn’t enforce prop types correctly.',
  difficulty: 'easy',
  bugType: 'Props',
  projectFiles: {
    'User.js': `import React from 'react';
import PropTypes from 'prop-types';

function User({ name, age }) {
  return <p>{name} - {age}</p>;
}

User.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number
};

export default User;`
  },
  solution: 'The code is correct; ensure PropTypes is imported and used in development mode.',
  hints: [
    'PropTypes only warns in development',
    'Check the import statement'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
{
  id: 122,
  title: 'useMemo Not Optimizing',
  description: 'The expensive computation re-runs on every render.',
  difficulty: 'medium',
  bugType: 'Performance',
  projectFiles: {
    'Expensive.js': `import React, { useState } from 'react';

function Expensive() {
  const [count, setCount] = useState(0);

  const compute = () => {
    console.log('Computing...');
    return Array(1000).fill(count).reduce((a, b) => a + b, 0);
  };

  const result = compute();

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default Expensive;`
  },
  solution: 'Wrap compute in useMemo with [count] as dependency: const result = useMemo(() => compute(), [count]);.',
  hints: [
    'useMemo caches values',
    'Add dependencies to re-compute'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
{
  id: 123,
  title: 'Class Component State Error',
  description: 'The state doesn’t update in the class component.',
  difficulty: 'medium',
  bugType: 'State',
  projectFiles: {
    'Counter.js': `import React from 'react';

class Counter extends React.Component {
  state = { count: 0 };

  increment() {
    this.state.count++;
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

export default Counter;`
  },
  solution: 'Use setState: this.setState({ count: this.state.count + 1 }); and bind increment.',
  hints: [
    'State is immutable',
    'Event handlers need binding'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
{
  id: 124,
  title: 'Missing useCallback',
  description: 'The child component re-renders unnecessarily.',
  difficulty: 'hard',
  bugType: 'Performance',
  projectFiles: {
    'Parent.js': `import React, { useState } from 'react';
import Child from './Child';

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => console.log('Clicked');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}

export default Parent;`,
    'Child.js': `import React from 'react';

const Child = React.memo(({ onClick }) => {
  console.log('Child render');
  return <button onClick={onClick}>Child Button</button>;
});

export default Child;`
  },
  solution: 'Wrap handleClick in useCallback: const handleClick = useCallback(() => console.log(\'Clicked\'), []);.',
  hints: [
    'Functions re-create on render',
    'useCallback stabilizes callbacks'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
{
  id: 125,
  title: 'Event Propagation Issue',
  description: 'Clicking the inner div triggers the outer handler.',
  difficulty: 'easy',
  bugType: 'Events',
  projectFiles: {
    'Box.js': `import React from 'react';

function Box() {
  return (
    <div onClick={() => console.log('Outer')}>
      <div onClick={() => console.log('Inner')}>
        Click Me
      </div>
    </div>
  );
}

export default Box;`
  },
  solution: 'Stop propagation: <div onClick={(e) => { e.stopPropagation(); console.log(\'Inner\'); }}>.',
  hints: [
    'Events bubble up',
    'Use stopPropagation'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
{
  id: 126,
  title: 'useContext Undefined',
  description: 'The context value is undefined in the child.',
  difficulty: 'medium',
  bugType: 'Context',
  projectFiles: {
    'App.js': `import React, { createContext } from 'react';
import Child from './Child';

const MyContext = createContext();

function App() {
  return (
    <MyContext.Provider value={{ theme: 'dark' }}>
      <Child />
    </MyContext.Provider>
  );
}

export default App;`,
    'Child.js': `import React, { useContext } from 'react';

function Child() {
  const value = useContext();
  return <p>{value.theme}</p>;
}`
  },
  solution: 'Pass MyContext to useContext: const value = useContext(MyContext);.',
  hints: [
    'useContext needs the context object',
    'Check the argument'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
{
  id: 127,
  title: 'Key Prop Warning',
  description: 'A list renders without keys, causing a warning.',
  difficulty: 'easy',
  bugType: 'Lists',
  projectFiles: {
    'List.js': `import React from 'react';

function List() {
  const data = ['X', 'Y', 'Z'];
  return (
    <ul>
      {data.map(item => <li>{item}</li>)}
    </ul>
  );
}

export default List;`
  },
  solution: 'Add a key: {data.map((item, index) => <li key={index}>{item}</li>)}.',
  hints: [
    'React needs keys for list items',
    'Use index or unique IDs'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
{
  id: 128,
  title: 'Async State Update Error',
  description: 'The state doesn’t reflect the latest value after an async call.',
  difficulty: 'medium',
  bugType: 'State',
  projectFiles: {
    'Fetcher.js': `import React, { useState } from 'react';

function Fetcher() {
  const [data, setData] = useState('');

  const fetchData = () => {
    setTimeout(() => {
      setData('Loaded');
      console.log(data);
    }, 1000);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch</button>
      <p>{data}</p>
    </div>
  );
}

export default Fetcher;`
  },
  solution: 'Use useEffect or log in a callback: useEffect(() => { console.log(data); }, [data]);.',
  hints: [
    'State updates are async',
    'Log after state settles'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
{
  id: 129,
  title: 'Strict Mode Double Render',
  description: 'The component logs twice in development.',
  difficulty: 'hard',
  bugType: 'Rendering',
  projectFiles: {
    'App.js': `import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('Rendered');
  }, []);

  return <p>Hello</p>;
}

export default App;`
  },
  solution: 'This is expected in StrictMode; no fix needed, but disable StrictMode if unwanted.',
  hints: [
    'StrictMode double-invokes effects',
    'Check index.js for <StrictMode>'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
{
  id: 130,
  title: 'Conditional Hook Error',
  description: 'The app crashes due to a conditional hook call.',
  difficulty: 'medium',
  bugType: 'Hooks',
  projectFiles: {
    'Conditional.js': `import React, { useState, useEffect } from 'react';

function Conditional() {
  const [flag, setFlag] = useState(false);

  if (flag) {
    useEffect(() => {
      console.log('Effect');
    }, []);
  }

  return <button onClick={() => setFlag(true)}>Toggle</button>;
}

export default Conditional;`
  },
  solution: 'Move useEffect outside the condition; hooks must be called unconditionally.',
  hints: [
    'Hooks can’t be conditional',
    'Move logic inside the hook'
  ],
  options: [],
  correctOption: 0,
  framework: 'react'
},
      {
        id: 101,
        title: 'Component Props Error',
        description: 'The component is not rendering the props correctly. Find and fix the issue!',
        difficulty: 'easy',
        bugType: 'Props',
        projectFiles: {
          'App.js': `import React from 'react';
import UserProfile from './UserProfile';

function App() {
  return (
    <div className="App">
      <h1>User Profile</h1>
      <UserProfile name="John Doe" email="john@example.com" />
    </div>
  );
}

export default App;`,
          'UserProfile.js': `import React from 'react';

function UserProfile(props) {
  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p>Email: {email}</p>
    </div>
  );
}

export default UserProfile;`
        },
        solution: 'Props need to be accessed using props.propName or by destructuring. In UserProfile.js, name and email are being accessed directly instead of using props.name and props.email. Fix: function UserProfile({ name, email }) { ... }',
        hints: [
          'Check how properties are accessed in the UserProfile component',
          'Props are passed as an object to functional components',
          'Destructuring in the parameter list can simplify prop access'
        ],
        options: [
          'Change <UserProfile name="John Doe" email="john@example.com" /> to <UserProfile props={{name: "John Doe", email: "john@example.com"}} />',
          'Change the function to: function UserProfile({name, email}) { ... }',
          'Add this.props = props in the component',
          'Use props.name and props.email instead of name and email'
        ],
        correctOption: 1,
        framework: 'react'
      },
      {
        id: 102,
        title: 'Infinite Loop with useEffect',
        description: 'The component causes an infinite render loop. Fix the issue!',
        difficulty: 'medium',
        bugType: 'Hooks',
        projectFiles: {
          'Counter.js': `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  });

  return <div>Count: {count}</div>;
}

export default Counter;`
        },
        solution: 'The useEffect hook runs after every render without a dependency array, causing setCount to trigger another render. Add an empty dependency array: useEffect(() => { setCount(count + 1); }, []); to run it only once on mount.',
        hints: [
          'Check the useEffect dependency array',
          'An empty array means the effect runs only once',
          'Missing dependencies can cause infinite loops'
        ],
        options: [
          'Remove the useEffect hook entirely',
          'Add [] as the second argument to useEffect',
          'Add [count] as the dependency array',
          'Use useCallback instead of useEffect'
        ],
        correctOption: 1,
        framework: 'react'
      },
      {
        id: 103,
        title: 'State Update Not Reflecting',
        description: 'Clicking the button doesn’t update the displayed count. Fix the bug!',
        difficulty: 'easy',
        bugType: 'State',
        projectFiles: {
          'Counter.js': `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    count++;
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;`
        },
        solution: 'State updates must use the setter function (setCount). Direct mutation (count++) doesn’t trigger a re-render. Fix: setCount(count + 1);',
        hints: [
          'State variables are immutable in React',
          'Use the setter function to update state',
          'Direct assignment doesn’t notify React of changes'
        ],
        options: [
          'Change count++ to setCount(count + 1)',
          'Add useEffect to watch count changes',
          'Use this.state instead of useState',
          'Make count a global variable'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 104,
        title: 'Event Handler Binding Issue',
        description: 'The button click doesn’t update the state. Find the problem!',
        difficulty: 'medium',
        bugType: 'Events',
        projectFiles: {
          'Toggle.js': `import React from 'react';

class Toggle extends React.Component {
  state = { isOn: false };

  toggle() {
    this.setState({ isOn: !this.state.isOn });
  }

  render() {
    return (
      <button onClick={this.toggle}>Toggle: {this.state.isOn ? 'ON' : 'OFF'}</button>
    );
  }
}

export default Toggle;`
        },
        solution: 'In class components, event handlers need to be bound to the component instance. Fix: Bind toggle in the constructor (this.toggle = this.toggle.bind(this)) or use an arrow function (toggle = () => { ... }).',
        hints: [
          'Check how this is handled in class methods',
          'Event handlers lose context unless bound',
          'Arrow functions automatically bind this'
        ],
        options: [
          'Add this.toggle = this.toggle.bind(this) in constructor',
          'Change toggle() to toggle = () => { ... }',
          'Add bind(this) in the onClick: onClick={this.toggle.bind(this)}',
          'All of the above'
        ],
        correctOption: 3,
        framework: 'react'
      },
      {
        id: 105,
        title: 'Conditional Rendering Failure',
        description: 'The message doesn’t show when the condition is true. Fix it!',
        difficulty: 'easy',
        bugType: 'Rendering',
        projectFiles: {
          'Message.js': `import React, { useState } from 'react';

function Message() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>Show Message</button>
      {show = true && <p>Hello, React!</p>}
    </div>
  );
}

export default Message;`
        },
        solution: 'The code uses an assignment (=) instead of a comparison (===) in the conditional rendering. Fix: {show === true && <p>Hello, React!</p>} or simply {show && <p>Hello, React!</p>}.',
        hints: [
          'Check the operator used in the condition',
          'Assignment vs comparison in JSX',
          'Boolean state can be used directly with &&'
        ],
        options: [
          'Change = to ===',
          'Remove true and use {show && <p>Hello, React!</p>}',
          'Add an if statement outside JSX',
          'Both 0 and 1 are correct'
        ],
        correctOption: 3,
        framework: 'react'
      },
      {
        id: 106,
        title: 'React Keys Error',
        description: 'The list rendering causes a warning about missing keys. Fix the issue.',
        difficulty: 'easy',
        bugType: 'Lists',
        projectFiles: {
          'ItemList.js': `import React from 'react';

function ItemList() {
  const items = [
    { name: 'Apple', price: 1.20 },
    { name: 'Banana', price: 0.50 },
    { name: 'Orange', price: 0.80 }
  ];
  
  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {items.map((item) => (
          <li>
            {item.name}: {(item.price).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;`
        },
        solution: 'Add a unique key prop to each <li> element using item.name or an index. Fix: <li key={item.name}> or <li key={index}> with index from map((item, index)).',
        hints: [
          'React requires a key for each list item',
          'Keys should be unique among siblings',
          'Avoid using index unless the list is static'
        ],
        options: [
          'Add key={Math.random()}',
          'Add key={index} with map((item, index))',
          'Add key={item.name}',
          'Both 1 and 2'
        ],
        correctOption: 2,
        framework: 'react'
      },
      {
        id: 107,
        title: 'useState Initial Value Issue',
        description: 'The initial state isn’t set correctly on component mount. Fix it!',
        difficulty: 'medium',
        bugType: 'State',
        projectFiles: {
          'Timer.js': `import React, { useState } from 'react';

function Timer() {
  const [time, setTime] = useState(getInitialTime());

  function getInitialTime() {
    return new Date().toLocaleTimeString();
  }

  return (
    <div>
      <p>Time: {time}</p>
      <button onClick={() => setTime(getInitialTime())}>Update</button>
    </div>
  );
}

export default Timer;`
        },
        solution: 'useState evaluates the initial value only once. Use a function directly in useState: useState(() => new Date().toLocaleTimeString()).',
        hints: [
          'useState only runs the initializer once',
          'Pass a function to useState for dynamic initial values',
          'Avoid calling functions outside useState'
        ],
        options: [
          'Change to useState(() => getInitialTime())',
          'Move getInitialTime inside useEffect',
          'Call setTime in useEffect',
          'Add time as a dependency'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 108,
        title: 'Form Input Not Updating',
        description: 'Typing in the input doesn’t update the state. Fix the bug!',
        difficulty: 'easy',
        bugType: 'Forms',
        projectFiles: {
          'Form.js': `import React, { useState } from 'react';

function Form() {
  const [text, setText] = useState('');

  return (
    <div>
      <input type="text" value={text} />
      <p>You typed: {text}</p>
    </div>
  );
}

export default Form;`
        },
        solution: 'Add an onChange handler to update the state: <input type="text" value={text} onChange={(e) => setText(e.target.value)} />.',
        hints: [
          'Controlled inputs need an onChange handler',
          'State won’t update without event handling',
          'Check the input’s event properties'
        ],
        options: [
          'Add onChange={(e) => setText(e.target.value)}',
          'Remove the value prop',
          'Use useEffect to sync the input',
          'Add a ref instead of state'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 109,
        title: 'useEffect Cleanup Missing',
        description: 'The interval keeps running after unmounting. Fix the leak!',
        difficulty: 'medium',
        bugType: 'Hooks',
        projectFiles: {
          'Clock.js': `import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return <div>Current Time: {time}</div>;
}

export default Clock;`
        },
        solution: 'Add a cleanup function in useEffect to clear the interval: return () => clearInterval(interval);.',
        hints: [
          'useEffect can return a cleanup function',
          'Intervals need to be cleared on unmount',
          'Memory leaks occur without cleanup'
        ],
        options: [
          'Add return () => clearInterval(interval)',
          'Remove the dependency array',
          'Use clearTimeout instead',
          'Move interval outside useEffect'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 110,
        title: 'Context Not Propagating',
        description: 'The child component doesn’t receive the context value. Fix it!',
        difficulty: 'medium',
        bugType: 'Context',
        projectFiles: {
          'App.js': `import React, { createContext } from 'react';
import Child from './Child';

const ThemeContext = createContext('light');

function App() {
  return (
    <div>
      <Child />
    </div>
  );
}

export default App;`,
          'Child.js': `import React, { useContext } from 'react';
import { ThemeContext } from './App';

function Child() {
  const theme = useContext(ThemeContext);
  return <p>Theme: {theme}</p>;
}

export default Child;`
        },
        solution: 'Wrap the Child component in a ThemeContext.Provider: <ThemeContext.Provider value="light"><Child /></ThemeContext.Provider>.',
        hints: [
          'Context values need a Provider',
          'Children must be nested inside the Provider',
          'Check the context import path'
        ],
        options: [
          'Add ThemeContext.Provider around Child',
          'Pass theme as a prop instead',
          'Use useState in Child',
          'Import ThemeContext differently'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 111,
        title: 'Duplicate State Update',
        description: 'Clicking the button increments the counter twice. Fix the bug!',
        difficulty: 'medium',
        bugType: 'State',
        projectFiles: {
          'Counter.js': `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;`
        },
        solution: 'Multiple setCount calls use the same state snapshot. Use the functional update form: setCount(prev => prev + 1); twice, or combine into one: setCount(prev => prev + 2).',
        hints: [
          'State updates are batched',
          'Use the previous state in setCount',
          'Avoid multiple direct updates'
        ],
        options: [
          'Change to setCount(prev => prev + 2)',
          'Add useEffect to sync state',
          'Remove one setCount call',
          'Use useReducer instead'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 112,
        title: 'Missing Dependency in useEffect',
        description: 'The effect doesn’t update when the prop changes. Fix it!',
        difficulty: 'medium',
        bugType: 'Hooks',
        projectFiles: {
          'Display.js': `import React, { useEffect } from 'react';

function Display({ value }) {
  useEffect(() => {
    console.log('Value:', value);
  }, []);

  return <div>Value: {value}</div>;
}

export default Display;`
        },
        solution: 'Add value to the dependency array: useEffect(() => { console.log("Value:", value); }, [value]);.',
        hints: [
          'Effects need dependencies to react to changes',
          'Empty array means run once',
          'Include props used in the effect'
        ],
        options: [
          'Add [value] to useEffect',
          'Remove useEffect entirely',
          'Use useMemo instead',
          'Add value as a state variable'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 113,
        title: 'Uncontrolled Component Issue',
        description: 'The input value persists after clearing state. Fix it!',
        difficulty: 'easy',
        bugType: 'Forms',
        projectFiles: {
          'Input.js': `import React, { useState } from 'react';

function Input() {
  const [text, setText] = useState('');

  const clear = () => {
    setText('');
  };

  return (
    <div>
      <input type="text" />
      <button onClick={clear}>Clear</button>
      <p>Text: {text}</p>
    </div>
  );
}

export default Input;`
        },
        solution: 'Make the input controlled by adding value={text} and onChange={(e) => setText(e.target.value)}.',
        hints: [
          'Uncontrolled inputs don’t sync with state',
          'Add value and onChange props',
          'State should drive the input'
        ],
        options: [
          'Add value={text} and onChange handler',
          'Remove the input entirely',
          'Use a ref to clear the input',
          'Add useEffect to reset'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 114,
        title: 'Fragment Syntax Error',
        description: 'The component throws a syntax error. Fix the rendering!',
        difficulty: 'easy',
        bugType: 'Rendering',
        projectFiles: {
          'List.js': `import React from 'react';

function List() {
  const items = ['A', 'B', 'C'];

  return (
    <>
      <h2>List</h2>
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </>
  );
}

export default List;`
        },
        solution: 'The code is correct as-is. Ensure the React version supports fragments (<>...</>). If not, import Fragment: import React, { Fragment } from "react" and use <Fragment>...</Fragment>.',
        hints: [
          'Check React version for fragment support',
          'Fragments need explicit import in older versions',
          'Empty tags are shorthand for Fragment'
        ],
        options: [
          'Import Fragment and use <Fragment>',
          'Wrap in a div instead',
          'Remove the <> tags',
          'Add a key to the fragment'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 115,
        title: 'useReducer Not Dispatching',
        description: 'The state doesn’t update when dispatching an action. Fix it!',
        difficulty: 'medium',
        bugType: 'State',
        projectFiles: {
          'Counter.js': `import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch('increment')}>Increment</button>
    </div>
  );
}

export default Counter;`
        },
        solution: 'Dispatch expects an object with a type property. Fix: dispatch({ type: "increment" }).',
        hints: [
          'useReducer actions are typically objects',
          'Check the dispatch argument',
          'Reducer expects a structured action'
        ],
        options: [
          'Change dispatch("increment") to dispatch({ type: "increment" })',
          'Change reducer to accept strings',
          'Use useState instead',
          'Add a default case'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 116,
        title: 'Memoization Failure',
        description: 'The component re-renders unnecessarily. Optimize it!',
        difficulty: 'hard',
        bugType: 'Performance',
        projectFiles: {
          'ExpensiveChild.js': `import React from 'react';

function ExpensiveChild({ value }) {
  console.log('Rendering ExpensiveChild');
  return <div>Value: {value}</div>;
}

export default ExpensiveChild;`,
          'App.js': `import React, { useState } from 'react';
import ExpensiveChild from './ExpensiveChild';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ExpensiveChild value={42} />
    </div>
  );
}

export default App;`
        },
        solution: 'Wrap ExpensiveChild with React.memo to prevent re-renders when props don’t change: export default React.memo(ExpensiveChild);.',
        hints: [
          'Check for unnecessary re-renders',
          'React.memo prevents re-renders if props are same',
          'Parent state changes trigger child renders'
        ],
        options: [
          'Add React.memo to ExpensiveChild',
          'Use useMemo in App',
          'Add a key prop to ExpensiveChild',
          'Remove console.log'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 117,
        title: 'Custom Hook Error',
        description: 'The custom hook causes an error. Fix the implementation!',
        difficulty: 'medium',
        bugType: 'Hooks',
        projectFiles: {
          'useCounter.js': `import { useState } from 'react';

function useCounter(initial) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount(count + 1);
  return [count, increment];
}

export default useCounter;`,
          'App.js': `import React from 'react';
import useCounter from './useCounter';

function App() {
  const counter = useCounter(0);

  return (
    <div>
      <p>Count: {counter}</p>
      <button onClick={counter.increment}>Increment</button>
    </div>
  );
}

export default App;`
        },
        solution: 'The hook returns an array, but increment is accessed as an object property. Fix: Destructure the return value: const [count, increment] = useCounter(0);.',
        hints: [
          'Check how the hook’s return value is used',
          'Array destructuring is needed',
          'Custom hooks return values flexibly'
        ],
        options: [
          'Change to const [count, increment] = useCounter(0)',
          'Return an object from useCounter',
          'Add useEffect to the hook',
          'Fix the button onClick syntax'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 118,
        title: 'Portal Rendering Issue',
        description: 'The modal doesn’t appear in the DOM. Fix the portal!',
        difficulty: 'hard',
        bugType: 'Rendering',
        projectFiles: {
          'Modal.js': `import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children }) {
  return (
    <div className="modal">
      {children}
    </div>
  );
}

export default Modal;`,
          'App.js': `import React, { useState } from 'react';
import Modal from './Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <Modal>Modal Content</Modal>}
    </div>
  );
}

export default App;`
        },
        solution: 'Use ReactDOM.createPortal to render the modal outside the parent DOM hierarchy: return ReactDOM.createPortal(<div className="modal">{children}</div>, document.body);.',
        hints: [
          'Modals should render outside the component tree',
          'Check ReactDOM methods',
          'Portals need a target DOM node'
        ],
        options: [
          'Add ReactDOM.createPortal',
          'Wrap Modal in a div',
          'Use useEffect to render',
          'Add a key to Modal'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 119,
        title: 'Suspense Fallback Missing',
        description: 'The app crashes during lazy loading. Fix the suspense setup!',
        difficulty: 'hard',
        bugType: 'Lazy Loading',
        projectFiles: {
          'App.js': `import React, { lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <LazyComponent />
    </div>
  );
}

export default App;`,
          'LazyComponent.js': `import React from 'react';

function LazyComponent() {
  return <p>Lazy Loaded!</p>;
}

export default LazyComponent;`
        },
        solution: 'Wrap LazyComponent in a Suspense component with a fallback: <Suspense fallback={<div>Loading...</div>}><LazyComponent /></Suspense>.',
        hints: [
          'Lazy components need Suspense',
          'Suspense requires a fallback UI',
          'Loading states must be handled'
        ],
        options: [
          'Add <Suspense fallback={<div>Loading...</div>}>',
          'Remove lazy loading',
          'Add useEffect to load',
          'Use a try-catch block'
        ],
        correctOption: 0,
        framework: 'react'
      },
      {
        id: 120,
        title: 'Ref Not Updating DOM',
        description: 'The ref doesn’t update the input value. Fix it!',
        difficulty: 'medium',
        bugType: 'Refs',
        projectFiles: {
          'Input.js': `import React, { useRef } from 'react';

function Input() {
  const inputRef = useRef();

  const setValue = () => {
    inputRef.current = 'Hello';
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={setValue}>Set Value</button>
    </div>
  );
}

export default Input;`
        },
        solution: 'Refs hold references, not values directly. Update the DOM via inputRef.current.value: inputRef.current.value = "Hello";.',
        hints: [
          'Refs access DOM elements',
          'Use .value to change input content',
          'Don’t assign to ref directly'
        ],
        options: [
          'Change to inputRef.current.value = "Hello"',
          'Use useState instead of useRef',
          'Add useEffect to sync ref',
          'Remove the ref'
        ],
        correctOption: 0,
        framework: 'react'
      }
    ];
  }

  getChallenges(): Observable<Challenge[]> {
    return this.frameworkToggleService.currentFramework$.pipe(
      map(framework => this.challenges.filter(c => c.framework === framework))
    );
  }

  getChallenge(id: number): Observable<Challenge | undefined> {
    return of(this.challenges.find(c => c.id === id));
  }

  getRandomChallenge(): Observable<Challenge> {
    return this.frameworkToggleService.currentFramework$.pipe(
      map(framework => {
        const filteredChallenges = this.challenges.filter(c => c.framework === framework);
        const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
        return filteredChallenges[randomIndex];
      })
    );
  }
}