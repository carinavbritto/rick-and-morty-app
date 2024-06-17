import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../../service/rick-and-morty.service';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { Character } from '../../interfaces/character.interface';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  characters: Character[] = [];

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit(): void {
    this.rickAndMortyService
      .getApiData('character')
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar personagens:', error);
          return of([]); // Retorna um array vazio em caso de erro
        }),
      )
      .subscribe((data: any) => {
        // Tipar 'data' para receber o objeto da API
        this.characters = data.results; // Extrair o array 'results'
      });
  }
}
