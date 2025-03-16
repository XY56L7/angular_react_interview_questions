import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { ChallengeDetailComponent } from './components/challenge-detail/challenge-detail.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';
import { KnowledgeBaseComponent } from './components/knowledge-base/knowledge-base.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'challenges', component: ChallengeListComponent },
  { path: 'challenge/:id', component: ChallengeDetailComponent },
  { path: 'flashcards', component: FlashcardsComponent },
  { path: 'knowledge-base', component: KnowledgeBaseComponent },
  { path: 'random', redirectTo: 'challenge/random', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
