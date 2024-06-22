import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../service/theme.service';
import { ToggleThemeComponent } from '../toggle-theme/toggle-theme.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ToggleThemeComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
