import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Framework = 'angular' | 'react';

@Injectable({
  providedIn: 'root'
})
export class FrameworkToggleService {
  private frameworkSubject = new BehaviorSubject<Framework>('angular');
  currentFramework$: Observable<Framework> = this.frameworkSubject.asObservable();

  constructor() {
    const savedFramework = localStorage.getItem('selectedFramework') as Framework;
    if (savedFramework && (savedFramework === 'angular' || savedFramework === 'react')) {
      this.frameworkSubject.next(savedFramework);
    }
  }

  getCurrentFramework(): Framework {
    return this.frameworkSubject.value;
  }

  toggleFramework(): void {
    const newFramework: Framework = this.frameworkSubject.value === 'angular' ? 'react' : 'angular';
    this.frameworkSubject.next(newFramework);
    localStorage.setItem('selectedFramework', newFramework);
  }

  setFramework(framework: Framework): void {
    this.frameworkSubject.next(framework);
    localStorage.setItem('selectedFramework', framework);
  }
} 