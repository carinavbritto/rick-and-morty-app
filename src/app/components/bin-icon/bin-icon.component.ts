import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bin-icon',
  standalone: true,
  imports: [],
  templateUrl: './bin-icon.component.html',
  styleUrl: './bin-icon.component.scss',
})
export class BinIconComponent {
  @Input() width: string = '20';
  @Input() height: string = '25';
  @Input() fill: string = '#A4A4A4';
}
