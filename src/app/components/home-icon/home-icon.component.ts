import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home-icon',
  standalone: true,
  imports: [],
  templateUrl: './home-icon.component.html',
  styleUrl: './home-icon.component.scss',
})
export class HomeIconComponent {
  @Input() width: string = '24';
  @Input() height: string = '24';
  @Input() fill: string = '#A4A4A4';

  viewBox: string = '0 0 24 24';

  ngOnChanges(changes: SimpleChanges) {
    this.updateViewBox();
  }

  updateViewBox() {
    const width = parseFloat(this.width);
    const height = parseFloat(this.height);
    this.viewBox = `0 0 ${width} ${height}`;
  }
}
