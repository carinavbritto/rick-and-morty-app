import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'themePreference';
  private darkThemeClass = 'dark-theme';
  private lightThemeClass = 'light-theme';

  constructor() {
    const savedTheme = this.getSavedTheme();
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.darkThemeClass); // Default
    }
  }

  toggleTheme() {
    const currentTheme = this.getTheme();
    if (currentTheme === this.darkThemeClass) {
      this.setTheme(this.lightThemeClass);
    } else {
      this.setTheme(this.darkThemeClass);
    }
  }

  getTheme(): string {
    return document.body.classList.contains(this.darkThemeClass)
      ? this.darkThemeClass
      : this.lightThemeClass;
  }

  private setTheme(theme: string) {
    document.body.classList.remove(this.darkThemeClass, this.lightThemeClass);
    document.body.classList.add(theme);
    localStorage.setItem(this.storageKey, theme);
  }

  private getSavedTheme(): string | null {
    return localStorage.getItem(this.storageKey);
  }
}
