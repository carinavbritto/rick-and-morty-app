import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-heart-outline-icon',
  standalone: true,
  imports: [],
  templateUrl: './heart-outline-icon.component.html',
  styleUrl: './heart-outline-icon.component.sass',
})
export class HeartOutlineIconComponent {
  @Input() width: string = '20';
  @Input() height: string = '18';
  @Input() fill: string = '#FAFAFA';
  viewBox: string = '0 0 20 18';

  ngOnChanges(changes: SimpleChanges) {
    this.updateViewBox();
  }

  updateViewBox() {
    const width = parseFloat(this.width);
    const height = parseFloat(this.height);
    this.viewBox = `0 0 ${width} ${height}`;
  }
}
