import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../service/rick-and-morty.service';
import { FavoriteService } from '../../service/favorite.service';
import {
  catchError,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  tap,
  finalize,
  map,
} from 'rxjs/operators';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Character } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { NoResultsMessageComponent } from '../../components/no-results-message/no-results-message.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchBarComponent,
    NoResultsMessageComponent,
    CardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  characters$: Observable<Character[]> = of([]);
  filteredCharacters$: BehaviorSubject<Character[]> = new BehaviorSubject<
    Character[]
  >([]);
  searchInput$ = new BehaviorSubject<string>('');
  loading: boolean = false;
  noResultsFound: boolean = false;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    this.characters$ = this.searchInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap((searchTerm: string) => {
        if (searchTerm.trim() === '') {
          return this.fetchCharacters();
        } else {
          return this.rickAndMortyService
            .searchCharacterByName(searchTerm)
            .pipe(
              catchError((error) => {
                console.error('Erro ao buscar personagens:', error);
                return of({ results: [] } as { results: Character[] });
              }),
              tap(() => (this.noResultsFound = false)),
              tap((data) => (this.noResultsFound = data.results.length === 0)),
              switchMap((data) => {
                this.filteredCharacters$.next(data.results);
                return of(data.results);
              }),
            );
        }
      }),
      finalize(() => (this.loading = false)),
    );

    this.characters$.subscribe();

    this.filteredCharacters$.next([]);
  }

  onSearch(searchTerm: string): void {
    this.searchInput$.next(searchTerm);
  }

  toggleFavorite(character: Character): void {
    if (this.isFavorite(character)) {
      this.favoriteService.removeFromFavorites(character);
    } else {
      this.favoriteService.addToFavorites(character);
    }
  }

  isFavorite(character: Character): boolean {
    return this.favoriteService
      .getFavorites()
      .some((fav) => fav.id === character.id);
  }

  private fetchCharacters(): Observable<Character[]> {
    return this.rickAndMortyService.getApiData('character').pipe(
      catchError((error) => {
        console.error('Erro ao buscar personagens:', error);
        return of({ results: [] } as { results: Character[] });
      }),
      map((data) => data.results),
      tap((results) => this.filteredCharacters$.next(results)),
    );
  }
}
