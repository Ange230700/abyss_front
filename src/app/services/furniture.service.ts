// src\app\services\furniture.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CardFurniture } from '~/src/app/models/card-furniture.model';
import { environment } from '~/src/environments/environment';
import { FurnitureDetails } from '~/src/app/models/furniture-details.model';
import { FurnitureType } from '~/src/app/models/furniture-type.model';
import { Material } from '~/src/app/models/material.model';
import { FurnitureFormData } from '~/src/app/models/furniture-form-data.model';

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  private readonly apiUrl = `${environment.apiBaseUrl}`;

  constructor(private readonly http: HttpClient) {}

  // If your API always returns an array, prefer this:
  getFurnitures(): Observable<CardFurniture[]> {
    return this.http
      .get<CardFurniture[] | CardFurniture>(`${this.apiUrl}/furnitures`)
      .pipe(
        map((response) => {
          // If API returns a single object, wrap it into an array
          if (Array.isArray(response)) {
            return response;
          } else {
            // Defensive: fallback if the backend returns a single object
            return [
              {
                id: response.id || 0,
                name: response.name || '',
                price: response.price || 0,
                imageUrl: response.imageUrl || '',
              },
            ];
          }
        }),
      );
  }

  getFurnitureByIdForDetails(id: number): Observable<FurnitureDetails> {
    return this.http
      .get<
        FurnitureDetails & { materialNames?: string[] }
      >(`${this.apiUrl}/furniture/${id}`)
      .pipe(
        map((response) => ({
          ...response,
          materials: response.materialNames || [],
        })),
      );
  }

  getFurnitureByIdForForm(id: number): Observable<FurnitureDetails> {
    return this.http
      .get<
        FurnitureDetails & { materialIds?: number[] }
      >(`${this.apiUrl}/furniture/${id}`)
      .pipe(
        map((response) => ({
          ...response,
          materials: [],
        })),
      );
  }

  deleteFurniture(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/furniture/${id}`);
  }

  // Use the actual input shape if your form does NOT provide all of FurnitureDetails fields!
  createFurniture(
    furnitureData: FurnitureFormData,
  ): Observable<FurnitureDetails> {
    return this.http.post<FurnitureDetails>(
      `${this.apiUrl}/furniture`,
      furnitureData,
    );
  }

  getFurnitureTypes(): Observable<FurnitureType[]> {
    return this.http.get<FurnitureType[]>(`${this.apiUrl}/furniture-types`);
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/materials`);
  }

  updateFurniture(id: number, furnitureData: FurnitureFormData) {
    return this.http.patch<FurnitureDetails>(
      `${this.apiUrl}/furniture/${id}`,
      furnitureData,
    );
  }
}
