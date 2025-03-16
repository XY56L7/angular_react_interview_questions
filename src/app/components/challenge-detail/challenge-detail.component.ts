import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Challenge, ChallengeService } from '../../services/challenge.service';

@Component({
  selector: 'app-challenge-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge-detail.component.html',
  styleUrl: './challenge-detail.component.scss'
})
export class ChallengeDetailComponent implements OnInit {
  challenge: Challenge | undefined;
  showSolution: boolean = false;
  currentHintIndex: number = -1;
  activeTab: string = 'description';
  files: string[] = [];
  activeFile: string = '';
  fileContents: {[key: string]: string} = {};
  selectedOption: number | null = null;
  isCorrectAnswer: boolean | null = null;
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      if (id === 'random') {
        this.loadRandomChallenge();
      } else if (id) {
        this.loadChallenge(parseInt(id, 10));
      }
    });
  }

  loadRandomChallenge() {
    this.isLoading = true;
    this.hasError = false;
    this.challengeService.getRandomChallenge().subscribe({
      next: (challenge) => {
        this.setupChallenge(challenge);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hiba a véletlenszerű kihívás betöltése során', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  loadChallenge(id: number) {
    this.isLoading = true;
    this.hasError = false;
    this.challengeService.getChallenge(id).subscribe({
      next: (challenge) => {
        if (challenge) {
          this.setupChallenge(challenge);
          this.isLoading = false;
        } else {
          this.router.navigate(['/challenges']);
        }
      },
      error: (err) => {
        console.error(`Hiba a(z) ${id} ID-jű kihívás betöltése során`, err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  setupChallenge(challenge: Challenge) {
    
    if (!challenge.options || challenge.options.length === 0) {
      console.warn(`A(z) ${challenge.id} ID-jű kihívásnak nincsenek megadva opciói. Alapértelmezett opciók beállítása.`);
      challenge.options = [
        'Opció 1 - A megoldás hiányzik ebben a kihívásban',
        'Opció 2 - Kérjük, értesítse az adminisztrátort',
        'Opció 3 - Próbáljon másik kihívást választani',
        'Opció 4 - Ez egy automatikusan generált opció'
      ];
      
      
      if (challenge.correctOption === undefined || challenge.correctOption === null) {
        challenge.correctOption = 0;
      }
    }
    
    
    if (challenge.correctOption >= challenge.options.length) {
      console.warn(`A(z) ${challenge.id} ID-jű kihívás helyes opciójának indexe érvénytelen. Alapértelmezett 0 index beállítása.`);
      challenge.correctOption = 0;
    }
    
    this.challenge = challenge;
    this.showSolution = false;
    this.currentHintIndex = -1;
    this.files = Object.keys(challenge.projectFiles || {});
    if (this.files.length > 0) {
      this.activeFile = this.files[0];
    }
    this.fileContents = {...(challenge.projectFiles || {})};
    this.selectedOption = null;
    this.isCorrectAnswer = null;
  }

  setActiveTab(tab: string) {
    if (tab === 'solution' && this.selectedOption === null) {
      alert('Előbb válassz egy megoldási lehetőséget!');
      return;
    }
    this.activeTab = tab;
  }

  setActiveFile(file: string) {
    this.activeFile = file;
  }

  showNextHint() {
    if (this.challenge && this.challenge.hints && this.currentHintIndex < this.challenge.hints.length - 1) {
      this.currentHintIndex++;
    }
  }

  resetHints() {
    this.currentHintIndex = -1;
  }

  selectOption(optionIndex: number) {
    this.selectedOption = optionIndex;
    if (this.challenge) {
      this.isCorrectAnswer = optionIndex === this.challenge.correctOption;
    }
  }

  toggleSolution() {
    this.showSolution = !this.showSolution;
  }

  goToList() {
    this.router.navigate(['/challenges']);
  }

  nextChallenge() {
    if (this.challenge) {
      const nextId = this.challenge.id + 1;
      this.challengeService.getChallenge(nextId).subscribe({
        next: (challenge) => {
          if (challenge) {
            this.router.navigate(['/challenge', nextId]);
          } else {
            this.loadRandomChallenge();
          }
        },
        error: () => {
          this.loadRandomChallenge();
        }
      });
    }
  }

  getDifficultyBadgeClass(difficulty: string | undefined): string {
    switch (difficulty) {
      case 'easy': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'hard': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getHintIndexes(): number[] {
    const indexes: number[] = [];
    for (let i = 0; i <= this.currentHintIndex; i++) {
      indexes.push(i);
    }
    return indexes;
  }
}
