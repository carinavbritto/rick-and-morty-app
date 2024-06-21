import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moon-icon',
  standalone: true,
  imports: [],
  templateUrl: './moon-icon.component.html',
  styleUrl: './moon-icon.component.scss',
})
export class MoonIconComponent {
  @Input() width: string = '20';
  @Input() height: string = '20';
  @Input() fill: string = '#f1c40f';
}
