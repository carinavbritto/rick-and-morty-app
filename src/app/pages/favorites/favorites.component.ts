import { Component } from '@angular/core';
import { FavoriteService } from '../../service/favorite.service';
import { Character } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  constructor(private favoriteService: FavoriteService) {}

  get favorites(): Character[] {
    return this.favoriteService.getFavorites();
  }

  toggleFavorite(character: Character): void {
    this.favoriteService.removeFromFavorites(character);
  }
}
