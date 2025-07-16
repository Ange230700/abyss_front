// src\app\services\furniture.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '~/src/environments/environment';
import { Furniture } from '~/src/app/models/furniture.model';

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  private readonly apiUrl = `${environment.apiBaseUrl}`;

  constructor(private readonly http: HttpClient) {}

  createFurniture(furnitureData: Furniture): Observable<Furniture> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, deleted_at, ...payload } = furnitureData;
    return this.http.post<Furniture>(`${this.apiUrl}/furniture`, payload);
  }

  getFurnitures(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`${this.apiUrl}/furnitures`);
  }

  getFurnitureByIdForDetails(id: number): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.apiUrl}/furnitures/${id}`);
  }

  deleteFurniture(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/furnitures/${id}`);
  }

  updateFurniture(id: number, furnitureData: Furniture) {
    return this.http.patch<Furniture>(
      `${this.apiUrl}/furnitures/${id}`,
      furnitureData,
    );
  }
}
