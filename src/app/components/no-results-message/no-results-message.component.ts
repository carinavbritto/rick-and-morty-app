import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-no-results-message',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './no-results-message.component.html',
  styleUrl: './no-results-message.component.scss',
})
export class NoResultsMessageComponent {}
