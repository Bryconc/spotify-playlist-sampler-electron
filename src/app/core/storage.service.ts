import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor() {}

  public set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public get<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const obj = JSON.parse(localStorage.getItem(key));
        resolve(obj);
      } catch (error) {
        reject(error);
      }
    });
  }
}
