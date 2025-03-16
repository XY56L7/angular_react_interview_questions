import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashcardService, Flashcard } from '../../services/flashcard.service';
import { firstValueFrom } from 'rxjs';
import { Framework, FrameworkToggleService } from '../../services/framework-toggle.service';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcards.component.html',
  styleUrl: './flashcards.component.scss'
})
export class FlashcardsComponent implements OnInit {
  flashcards: Flashcard[] = [];
  filteredFlashcards: Flashcard[] = [];
  categories: string[] = [];
  difficulties: { value: 'beginner' | 'intermediate' | 'advanced', label: string }[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];
  
  currentCard: Flashcard | null = null;
  cardIndex: number = 0;
  
  isFlipped: boolean = false;
  searchTerm: string = '';
  selectedCategory: string = 'all';
  selectedDifficulty: string = 'all';
  
  isLoading: boolean = true;
  
  isCardDeckMode: boolean = false;
  remainingCards: Flashcard[] = [];
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  
  currentFramework: Framework = 'angular';
  
  constructor(
    private flashcardService: FlashcardService,
    private router: Router,
    private frameworkToggleService: FrameworkToggleService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    
    this.frameworkToggleService.currentFramework$.subscribe(framework => {
      this.currentFramework = framework;
      this.loadFlashcards();
      this.loadCategories();
    });
  }
  
  async loadFlashcards(): Promise<void> {
    try {
      this.isLoading = true;
      this.flashcards = await firstValueFrom(this.flashcardService.getFlashcards());
      this.filteredFlashcards = [...this.flashcards];
      
      if (this.filteredFlashcards.length > 0) {
        this.currentCard = this.filteredFlashcards[0];
        this.cardIndex = 0;
      }
      
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading flashcards', error);
      this.isLoading = false;
    }
  }
  
  async loadCategories(): Promise<void> {
    try {
      this.categories = await firstValueFrom(this.flashcardService.getCategories());
    } catch (error) {
      console.error('Error loading categories', error);
    }
  }
  
  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }
  
  nextCard(): void {
    if (this.isCardDeckMode) {
      this.handleCardDeckNavigation();
      return;
    }
    
    this.isFlipped = false;
    this.cardIndex = (this.cardIndex + 1) % this.filteredFlashcards.length;
    this.currentCard = this.filteredFlashcards[this.cardIndex];
  }
  
  previousCard(): void {
    if (this.isCardDeckMode) {
      return; 
    }
    
    this.isFlipped = false;
    this.cardIndex = (this.cardIndex - 1 + this.filteredFlashcards.length) % this.filteredFlashcards.length;
    this.currentCard = this.filteredFlashcards[this.cardIndex];
  }
  
  getRandomCard(): void {
    if (this.filteredFlashcards.length <= 1) return;
    
    this.isFlipped = false;
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * this.filteredFlashcards.length);
    } while (newIndex === this.cardIndex);
    
    this.cardIndex = newIndex;
    this.currentCard = this.filteredFlashcards[this.cardIndex];
  }
  
  filterCards(): void {
    this.isFlipped = false;
    this.filteredFlashcards = this.flashcards.filter(card => {
      const matchesSearch = this.searchTerm === '' || 
        card.question.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        card.answer.toLowerCase().includes(this.searchTerm.toLowerCase());
        
      const matchesCategory = this.selectedCategory === 'all' || 
        card.category === this.selectedCategory;
        
      const matchesDifficulty = this.selectedDifficulty === 'all' || 
        card.difficulty === this.selectedDifficulty;
        
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
    
    this.cardIndex = 0;
    this.currentCard = this.filteredFlashcards.length > 0 ? this.filteredFlashcards[0] : null;
  }
  
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedDifficulty = 'all';
    this.filterCards();
  }
  
  getDifficultyClass(difficulty: string): string {
    switch(difficulty) {
      case 'beginner': return 'badge bg-success';
      case 'intermediate': return 'badge bg-warning text-dark';
      case 'advanced': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
  
  startCardDeckMode(): void {
    this.isCardDeckMode = true;
    this.remainingCards = [...this.filteredFlashcards];
    this.shuffleArray(this.remainingCards);
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    
    if (this.remainingCards.length > 0) {
      this.currentCard = this.remainingCards[0];
      this.isFlipped = false;
    } else {
      this.isCardDeckMode = false;
    }
  }
  
  exitCardDeckMode(): void {
    this.isCardDeckMode = false;
    this.currentCard = this.filteredFlashcards[this.cardIndex];
    this.isFlipped = false;
  }
  
  markCorrect(): void {
    if (!this.isCardDeckMode || !this.currentCard) return;
    
    this.correctAnswers++;
    this.remainingCards.shift(); 
    
    if (this.remainingCards.length > 0) {
      this.currentCard = this.remainingCards[0];
      this.isFlipped = false;
    } else {
      this.completeCardDeck();
    }
  }
  
  markIncorrect(): void {
    if (!this.isCardDeckMode || !this.currentCard) return;
    
    this.incorrectAnswers++;
    const currentCard = this.remainingCards.shift();
    if (currentCard) {
      this.remainingCards.push(currentCard);
    }
    
    if (this.remainingCards.length > 0) {
      this.currentCard = this.remainingCards[0];
      this.isFlipped = false;
    } else {
      this.completeCardDeck();
    }
  }
  
  handleCardDeckNavigation(): void {
    if (!this.isFlipped) {
      this.isFlipped = true;
    } else {
      if (this.remainingCards.length > 1) {
        const currentCard = this.remainingCards.shift();
        if (currentCard) {
          this.remainingCards.push(currentCard);
        }
        
        this.currentCard = this.remainingCards[0];
        this.isFlipped = false;
      } else if (this.remainingCards.length === 1) {
        this.completeCardDeck();
      }
    }
  }
  
  completeCardDeck(): void {
    alert(`Practice completed!\nCorrect answers: ${this.correctAnswers}\nIncorrect answers: ${this.incorrectAnswers}`);
    this.exitCardDeckMode();
  }
  
  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  getFrameworkName(): string {
    return this.currentFramework === 'angular' ? 'Angular' : 'React';
  }
}
