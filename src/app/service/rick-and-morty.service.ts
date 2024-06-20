import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private baseUrl: string = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  private getApiData(
    endpoint: string,
    page: number = 1,
  ): Observable<{ results: Character[]; info: any }> {
    return this.http.get<{ results: Character[]; info: any }>(
      `${this.baseUrl}/${endpoint}?page=${page}`,
    );
  }

  getAllCharacters(): Observable<Character[]> {
    return this.getApiData('character').pipe(
      switchMap((firstPage) => {
        const totalPages = firstPage.info.pages;
        const requests: Observable<Character[]>[] = [of(firstPage.results)];

        for (let page = 2; page <= totalPages; page++) {
          requests.push(
            this.getApiData('character', page).pipe(map((res) => res.results)),
          );
        }

        return forkJoin(requests).pipe(
          map((resultsArray) => resultsArray.flat()),
        );
      }),
      catchError(() => of([])), // Handle errors gracefully
    );
  }

  searchCharacterByName(name: string): Observable<Character[]> {
    const url = `${this.baseUrl}/character/?name=${name}`;
    return this.http.get<{ results: Character[] }>(url).pipe(
      map((response) => response.results),
      catchError(() => of([])), // Handle errors gracefully
    );
  }
}
