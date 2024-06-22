import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-to-top-btn',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './back-to-top-btn.component.html',
  styleUrl: './back-to-top-btn.component.scss',
})
export class BackToTopBtnComponent {
  isShow: boolean;
  faArrowUp = faArrowUp;

  constructor() {
    this.isShow = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > 100
    ) {
      this.isShow = true;
    } else if (
      this.isShow &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < 10
    ) {
      this.isShow = false;
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
