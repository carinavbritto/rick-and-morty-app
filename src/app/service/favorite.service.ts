import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites: Character[] = [];
  private storageKey = 'favoriteCharacters';

  constructor() {
    this.loadFavorites();
  }

  getFavorites(): Character[] {
    return this.favorites;
  }

  addToFavorites(character: Character): void {
    const index = this.favorites.findIndex((fav) => fav.id === character.id);
    if (index === -1) {
      this.favorites.push(character);
      this.saveFavorites();
    }
  }

  removeFromFavorites(character: Character): void {
    const index = this.favorites.findIndex((fav) => fav.id === character.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    }
  }

  getFavoriteCharacters(): Character[] {
    return this.favorites;
  }

  isFavorite(character: Character): boolean {
    return this.favorites.some((fav) => fav.id === character.id);
  }

  private saveFavorites(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }

  private loadFavorites(): void {
    const favorites = localStorage.getItem(this.storageKey);
    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
  }
}
