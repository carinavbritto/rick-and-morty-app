import { Component } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../service/favorite.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  favorites: Character[] = [];

  constructor(private favoriteService: FavoriteService) {}

  getFavoritesCount(): number {
    return this.favoriteService.getFavorites().length;
  }
}
