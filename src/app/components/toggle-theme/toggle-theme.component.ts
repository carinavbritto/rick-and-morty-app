import { Component } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../service/theme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-toggle-theme',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.scss',
})
export class ToggleThemeComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  faSun = faSun;
  faMoon = faMoon;
}
