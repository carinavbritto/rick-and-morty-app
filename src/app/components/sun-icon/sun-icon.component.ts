import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sun-icon',
  standalone: true,
  imports: [],
  templateUrl: './sun-icon.component.html',
  styleUrl: './sun-icon.component.scss',
})
export class SunIconComponent {
  @Input() width: string = '20';
  @Input() height: string = '20';
  @Input() fill: string = '#f39c12';

  viewBox: string = '0 0 24 24';

  // ngOnChanges(changes: SimpleChanges) {
  //   this.updateViewBox();
  // }

  // updateViewBox() {
  //   const width = parseFloat(this.width);
  //   const height = parseFloat(this.height);
  //   this.viewBox = `0 0 ${width} ${height}`;
  // }
}
