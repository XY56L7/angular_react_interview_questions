import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Framework, FrameworkToggleService } from '../../services/framework-toggle.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentFramework: Framework = 'angular';

  constructor(
    private router: Router,
    private frameworkToggleService: FrameworkToggleService
  ) {
    this.frameworkToggleService.currentFramework$.subscribe(framework => {
      this.currentFramework = framework;
    });
  }

  navigateToRandomChallenge(): void {
    this.router.navigate(['/random']);
  }

  toggleFramework(): void {
    this.frameworkToggleService.toggleFramework();
  }

  getFrameworkIcon(): string {
    return this.currentFramework === 'angular' ? 'bi-hurricane' : 'bi-trophy';
  }

  getFrameworkName(): string {
    return this.currentFramework === 'angular' ? 'Angular' : 'React';
  }

  getToggleTooltip(): string {
    return `Switch to ${this.currentFramework === 'angular' ? 'React' : 'Angular'}`;
  }
}
