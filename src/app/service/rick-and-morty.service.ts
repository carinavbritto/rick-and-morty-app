import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  getAllCharacters(
    page: number = 1,
  ): Observable<{ results: Character[]; info: any }> {
    return this.getApiData('character', page);
  }

  searchCharacterByName(name: string): Observable<Character[]> {
    const url = `${this.baseUrl}/character/?name=${name}`;
    return this.http.get<{ results: Character[] }>(url).pipe(
      map((response) => response.results),
      catchError(() => of([])),
    );
  }
}
