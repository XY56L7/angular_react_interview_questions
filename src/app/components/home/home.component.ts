import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeService } from '../../services/challenge.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Framework, FrameworkToggleService } from '../../services/framework-toggle.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentFramework: Framework = 'angular';

  constructor(
    private router: Router,
    private challengeService: ChallengeService,
    private frameworkToggleService: FrameworkToggleService
  ) {
    this.frameworkToggleService.currentFramework$.subscribe(framework => {
      this.currentFramework = framework;
    });
  }

  navigateToChallenges(): void {
    this.router.navigate(['/challenges']);
  }

  async navigateToRandomChallenge(): Promise<void> {
    try {
      const challenges = await firstValueFrom(this.challengeService.getChallenges());
      if (challenges && challenges.length > 0) {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        const randomChallenge = challenges[randomIndex];
        this.router.navigate(['/challenge', randomChallenge.id]);
      }
    } catch (error) {
      console.error('Hiba történt a véletlenszerű kihívás betöltésekor', error);
    }
  }
}
