import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KnowledgeService, Article } from '../../services/knowledge.service';
import { FormsModule } from '@angular/forms';
import { Framework, FrameworkToggleService } from '../../services/framework-toggle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss']
})
export class KnowledgeBaseComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  categories: string[] = [];
  tags: string[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedTag: string = '';
  selectedArticle: Article | null = null;
  currentFramework: Framework = 'angular';
  private subscription: Subscription = new Subscription();
  
  constructor(
    private knowledgeService: KnowledgeService,
    private frameworkToggleService: FrameworkToggleService
  ) { }
  
  ngOnInit(): void {
    this.subscription.add(
      this.frameworkToggleService.currentFramework$.subscribe(framework => {
        this.currentFramework = framework;
        this.loadArticles();
        this.loadCategories();
        this.loadTags();
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  loadArticles(): void {
    this.knowledgeService.getArticles().subscribe(articles => {
      
      const frameworkArticles = articles.filter(article => 
        article.tags.includes(this.currentFramework) ||
        article.category.toLowerCase().includes(this.currentFramework)
      );
      
      this.articles = frameworkArticles;
      this.filteredArticles = frameworkArticles;
      
      
      if (this.selectedArticle) {
        this.selectedArticle = this.articles.find(a => a.id === this.selectedArticle?.id) || null;
        if (!this.selectedArticle) {
          
          this.backToList();
        }
      }
    });
  }
  
  loadCategories(): void {
    this.knowledgeService.getCategories().subscribe(categories => {
      
      const frameworkCategories = categories.filter(category => 
        category.toLowerCase().includes(this.currentFramework) ||
        category === 'Core Concepts' 
      );
      
      this.categories = frameworkCategories;
    });
  }
  
  loadTags(): void {
    this.knowledgeService.getTags().subscribe(tags => {
      
      const frameworkTags = tags.filter(tag => 
        tag === this.currentFramework || 
        !['angular', 'react'].includes(tag)
      );
      
      this.tags = frameworkTags;
    });
  }
  
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedTag = '';
    this.applyFilters();
  }
  
  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.selectedCategory = '';
    this.applyFilters();
  }
  
  search(): void {
    this.applyFilters();
  }
  
  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedTag = '';
    this.searchQuery = '';
    this.filteredArticles = this.articles;
  }
  
  private applyFilters(): void {
    if (this.selectedCategory) {
      this.knowledgeService.getArticlesByCategory(this.selectedCategory).subscribe(articles => {
        
        this.filteredArticles = articles.filter(article => 
          article.tags.includes(this.currentFramework) ||
          article.category.toLowerCase().includes(this.currentFramework)
        );
      });
    } else if (this.selectedTag) {
      this.knowledgeService.getArticlesByTag(this.selectedTag).subscribe(articles => {
        
        this.filteredArticles = articles.filter(article => 
          article.tags.includes(this.currentFramework) ||
          article.category.toLowerCase().includes(this.currentFramework)
        );
      });
    } else if (this.searchQuery) {
      this.knowledgeService.searchArticles(this.searchQuery).subscribe(articles => {
        
        this.filteredArticles = articles.filter(article => 
          article.tags.includes(this.currentFramework) ||
          article.category.toLowerCase().includes(this.currentFramework)
        );
      });
    } else {
      this.filteredArticles = this.articles;
    }
  }
  
  viewArticle(article: Article): void {
    this.selectedArticle = article;
  }
  
  backToList(): void {
    this.selectedArticle = null;
  }
}
