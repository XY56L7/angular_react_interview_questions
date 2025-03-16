import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChallengeService, Challenge } from '../../services/challenge.service';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge-list.component.html',
  styleUrl: './challenge-list.component.scss'
})
export class ChallengeListComponent implements OnInit {
  challenges: Challenge[] = [];
  filteredChallenges: Challenge[] = [];
  difficultyFilter: string = 'all';
  searchTerm: string = '';

  constructor(
    private challengeService: ChallengeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.challengeService.getChallenges().subscribe(challenges => {
      this.challenges = challenges;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredChallenges = this.challenges.filter(challenge => {
      const matchesDifficulty = this.difficultyFilter === 'all' || challenge.difficulty === this.difficultyFilter;
      const matchesSearch = challenge.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           challenge.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           challenge.bugType.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesDifficulty && matchesSearch;
    });
  }

  onDifficultyChange(difficulty: string) {
    this.difficultyFilter = difficulty;
    this.applyFilters();
  }

  onSearchChange(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  startChallenge(id: number) {
    this.router.navigate(['/challenge', id]);
  }

  getDifficultyBadgeClass(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'hard': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
