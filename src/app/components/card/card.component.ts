import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { Observable, of } from 'rxjs';
import { NoResultsMessageComponent } from '../no-results-message/no-results-message.component';
import { CommonModule } from '@angular/common';
import { HeartOutlineIconComponent } from '../heart-outline-icon/heart-outline-icon.component';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    NoResultsMessageComponent,
    HeartOutlineIconComponent,
    HeartIconComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() characters$: Observable<Character[]> = of([]);
  @Input() loading: boolean = false;
  @Input() noResultsFound: boolean = false;
  @Output() toggleFavorite = new EventEmitter<Character>();

  favorites: Set<string> = new Set();

  onToggleFavorite(character: Character) {
    const characterId = character.id.toString();
    if (this.isFavorite(character)) {
      this.favorites.delete(characterId);
    } else {
      this.favorites.add(characterId);
    }
    this.toggleFavorite.emit(character);
  }

  isFavorite(character: Character): boolean {
    return this.favorites.has(character.id.toString());
  }
}
