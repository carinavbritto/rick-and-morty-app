import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-heart-icon',
  standalone: true,
  imports: [],
  templateUrl: './heart-icon.component.html',
  styleUrl: './heart-icon.component.scss',
})
export class HeartIconComponent {
  @Input() width: string = '30';
  @Input() height: string = '30';
  @Input() fill: string = '#A4A4A4';

  viewBox: string = '0 0 30 30';

  ngOnChanges(changes: SimpleChanges) {
    this.updateViewBox();
  }

  updateViewBox() {
    const width = parseFloat(this.width);
    const height = parseFloat(this.height);
    this.viewBox = `0 0 ${width} ${height}`;
  }
}
