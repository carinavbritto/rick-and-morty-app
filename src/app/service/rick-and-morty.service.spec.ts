import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RickAndMortyService } from './rick-and-morty.service';

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting],
      providers: [RickAndMortyService],
    });
    service = TestBed.inject(RickAndMortyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get api data from correct endpoint', () => {
    const endpoint = 'character';
    const dummyData = { results: [] };

    service.getApiData(endpoint).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${endpoint}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData); // Simula a resposta da API
  });
});
