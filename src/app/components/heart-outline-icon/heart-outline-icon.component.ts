import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-heart-outline-icon',
  standalone: true,
  imports: [],
  templateUrl: './heart-outline-icon.component.html',
  styleUrl: './heart-outline-icon.component.scss',
})
export class HeartOutlineIconComponent {
  @Input() width: string = '30';
  @Input() height: string = '30';
  @Input() fill: string = '#FAFAFA';

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
