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
import { of, Observable, BehaviorSubject, EMPTY } from 'rxjs';
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
  currentPage: number = 1;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    this.fetchCharacters();

    this.searchInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap((searchTerm: string) => {
          if (searchTerm.trim() === '') {
            return this.fetchCharacters().pipe(map(() => []));
          } else {
            return this.rickAndMortyService
              .searchCharacterByName(searchTerm)
              .pipe(
                catchError(() => {
                  this.noResultsFound = true;
                  return of([]);
                }),
                tap((data) => {
                  this.noResultsFound = data.length === 0;
                  this.filteredCharacters$.next(data);
                }),
              );
          }
        }),
        finalize(() => (this.loading = false)),
      )
      .subscribe();
  }

  fetchCharacters(page: number = 1): Observable<void> {
    this.currentPage = page;
    return this.rickAndMortyService.getAllCharacters(page).pipe(
      tap((response) => {
        if ('results' in response) {
          if (page === 1) {
            this.filteredCharacters$.next(response.results);
          } else {
            const currentCharacters = this.filteredCharacters$.getValue();
            this.filteredCharacters$.next([
              ...currentCharacters,
              ...response.results,
            ]);
          }
        }
      }),
      catchError(() => {
        return EMPTY;
      }),
      map(() => undefined),
    );
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

  loadMore(): void {
    const nextPage = this.currentPage + 1;
    this.fetchCharacters(nextPage).subscribe();
  }
}
