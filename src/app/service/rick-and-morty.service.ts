import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  private baseUrl: string = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getApiData(endpoint: string): Observable<{ results: Character[] }> {
    return this.http.get<{ results: Character[] }>(
      `${this.baseUrl}/${endpoint}`,
    );
  }
}
