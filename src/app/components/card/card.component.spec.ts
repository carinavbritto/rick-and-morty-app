import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CardComponent } from './card.component';
import { Character } from '../../interfaces/character.interface';
import { BinIconComponent } from '../bin-icon/bin-icon.component';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';
import { HeartOutlineIconComponent } from '../heart-outline-icon/heart-outline-icon.component';
import { NoResultsMessageComponent } from '../no-results-message/no-results-message.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        BinIconComponent,
        HeartOutlineIconComponent,
        HeartIconComponent,
        NoResultsMessageComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading message when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const loadingElement = fixture.debugElement.query(By.css('.loading'));
    expect(loadingElement).toBeTruthy();
  });

  it('should display no results message when not loading and no results found', () => {
    component.loading = false;
    component.noResultsFound = true;
    fixture.detectChanges();
    const noResultsElement = fixture.debugElement.query(
      By.css('.no-results-message'),
    );
    expect(noResultsElement).toBeTruthy();
  });

  it('should display characters when characters$ has data', () => {
    const charactersMock: Character[] = [
      {
        id: 1,
        name: 'Character 1',
        image: 'image1.jpg',
        species: 'Species 1',
        status: 'Alive',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        episode: [],
        url: '',
        created: '',
      },
      {
        id: 2,
        name: 'Character 2',
        image: 'image2.jpg',
        species: 'Species 2',
        status: 'Dead',
        type: '',
        gender: 'Female',
        origin: { name: 'Mars', url: '' },
        location: { name: 'Mars', url: '' },
        episode: [],
        url: '',
        created: '',
      },
    ];
    component.characters$ = of(charactersMock);
    fixture.detectChanges();

    const characterElements = fixture.debugElement.queryAll(
      By.css('.card-div'),
    );
    expect(characterElements.length).toBe(charactersMock.length);
  });

  it('should call onToggleFavorite when favorite button is clicked', () => {
    const charactersMock: Character[] = [
      {
        id: 1,
        name: 'Character 1',
        image: 'image1.jpg',
        species: 'Species 1',
        status: 'Alive',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        episode: [],
        url: '',
        created: '',
      },
    ];
    component.characters$ = of(charactersMock);
    fixture.detectChanges();

    spyOn(component, 'onToggleFavorite');
    const favoriteButton = fixture.debugElement.query(
      By.css('.favorite-button'),
    );
    favoriteButton.triggerEventHandler('click', null);

    expect(component.onToggleFavorite).toHaveBeenCalledWith(charactersMock[0]);
  });

  it('should display "Adicionar aos favoritos" if character is not favorite', () => {
    const charactersMock: Character[] = [
      {
        id: 1,
        name: 'Character 1',
        image: 'image1.jpg',
        species: 'Species 1',
        status: 'Alive',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        episode: [],
        url: '',
        created: '',
      },
    ];
    component.characters$ = of(charactersMock);
    spyOn(component, 'isFavorite').and.returnValue(false);
    fixture.detectChanges();

    const favoriteButton = fixture.debugElement.query(
      By.css('.favorite-button'),
    );
    expect(favoriteButton.attributes['aria-label']).toBe(
      'Adicionar aos favoritos',
    );
  });

  it('should display "Remover dos favoritos" if character is favorite', () => {
    const charactersMock: Character[] = [
      {
        id: 1,
        name: 'Character 1',
        image: 'image1.jpg',
        species: 'Species 1',
        status: 'Alive',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        episode: [],
        url: '',
        created: '',
      },
    ];
    component.characters$ = of(charactersMock);
    spyOn(component, 'isFavorite').and.returnValue(true);
    fixture.detectChanges();

    const favoriteButton = fixture.debugElement.query(
      By.css('.favorite-button'),
    );
    expect(favoriteButton.attributes['aria-label']).toBe(
      'Remover dos favoritos',
    );
  });

  it('should display no results message if characters list is empty', () => {
    component.characters$ = of([]);
    fixture.detectChanges();
    const noResultsElement = fixture.debugElement.query(
      By.directive(NoResultsMessageComponent),
    );
    expect(noResultsElement).toBeTruthy();
  });
});
