import { Component } from '@angular/core';
import { FavoriteService } from '../../service/favorite.service';
import { Character } from '../../interfaces/character.interface';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoResultsMessageComponent } from '../../components/no-results-message/no-results-message.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NoResultsMessageComponent,
    CardComponent,
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  loading: boolean = false;

  constructor(private favoriteService: FavoriteService) {}

  get characters$(): Observable<Character[]> {
    return of(this.favoriteService.getFavoriteCharacters());
  }

  toggleFavorite(character: Character): void {
    this.favoriteService.removeFromFavorites(character);
  }

  isFavorite(character: Character): boolean {
    return this.favoriteService.isFavorite(character);
  }
}
