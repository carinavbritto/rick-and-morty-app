import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites: Character[] = [];

  constructor() {}

  getFavorites(): Character[] {
    return this.favorites;
  }

  addToFavorites(character: Character): void {
    const index = this.favorites.findIndex((fav) => fav.id === character.id);
    if (index === -1) {
      this.favorites.push(character);
    }
  }

  removeFromFavorites(character: Character): void {
    const index = this.favorites.findIndex((fav) => fav.id === character.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  getFavoriteCharacters(): Character[] {
    return this.favorites;
  }

  isFavorite(character: Character): boolean {
    return this.favorites.some((fav) => fav.id === character.id);
  }
}
