import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // eslint-disable-next-line class-methods-use-this
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // eslint-disable-next-line class-methods-use-this
  setItem(key: string, payload: string): void {
    localStorage.setItem(key, payload);
  }

  // eslint-disable-next-line class-methods-use-this
  clearAll(): void {
    localStorage.clear();
  }

  // eslint-disable-next-line class-methods-use-this
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
