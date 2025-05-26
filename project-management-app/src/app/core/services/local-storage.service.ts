import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, payload: string): void {
    localStorage.setItem(key, payload);
  }

  clearAll(): void {
    localStorage.clear();
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
