import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { Observable, of } from 'rxjs';
import { NoResultsMessageComponent } from '../no-results-message/no-results-message.component';
import { CommonModule } from '@angular/common';
import { HeartOutlineIconComponent } from '../heart-outline-icon/heart-outline-icon.component';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NoResultsMessageComponent, HeartOutlineIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() characters$: Observable<Character[]> = of([]);
  @Input() loading: boolean = false;
  @Input() noResultsFound: boolean = false;
  @Output() toggleFavorite = new EventEmitter<Character>();
  @Output() isFavorite = new EventEmitter<Character>();

  onToggleFavorite(character: Character) {
    this.toggleFavorite.emit(character);
  }

  checkIsFavorite(character: Character) {
    this.isFavorite.emit(character);
  }
}
