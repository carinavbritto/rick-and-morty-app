import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { Observable, of, Subject } from 'rxjs';
import { NoResultsMessageComponent } from '../no-results-message/no-results-message.component';
import { CommonModule } from '@angular/common';
import { HeartOutlineIconComponent } from '../heart-outline-icon/heart-outline-icon.component';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';
import { BinIconComponent } from '../bin-icon/bin-icon.component';
import { FavoriteService } from '../../service/favorite.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    NoResultsMessageComponent,
    HeartOutlineIconComponent,
    HeartIconComponent,
    BinIconComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() characters$: Observable<Character[]> = of([]);
  @Input() loading: boolean = false;
  @Input() noResultsFound: boolean = false;
  @Input() noResultsTitle: string = '';
  @Input() noResultsDescription: string = '';
  @Input() showLink: boolean = false;
  @Input() isFavoritesPage: boolean = false;
  @Output() toggleFavorite = new EventEmitter<Character>();
  @Output() loadMore = new EventEmitter<void>();

  @ViewChild('loadMoreTrigger') loadMoreTrigger: ElementRef | null = null;

  private intersectionObserver?: IntersectionObserver;
  private destroy$ = new Subject<void>();

  constructor(private favoriteService: FavoriteService) {}

  onToggleFavorite(character: Character) {
    this.toggleFavorite.emit(character);
  }

  isFavorite(character: Character): boolean {
    return this.favoriteService.isFavorite(character);
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.intersectionObserver?.disconnect();
  }

  private setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        this.loadMore.emit();
      }
    });

    if (this.loadMoreTrigger) {
      this.intersectionObserver.observe(this.loadMoreTrigger.nativeElement);
    }
  }
}
