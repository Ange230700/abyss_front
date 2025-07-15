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

type RawCardFurniture = {
  id?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
  imageUrls?: string[];
};

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  private readonly apiUrl = `${environment.apiBaseUrl}`;

  constructor(private readonly http: HttpClient) {}

  getFurnitures(): Observable<CardFurniture[]> {
    return this.http
      .get<RawCardFurniture[] | RawCardFurniture>(`${this.apiUrl}/furnitures`)
      .pipe(
        map((response) => {
          const mapToCard = (item: RawCardFurniture): CardFurniture => ({
            id: item.id ?? 0,
            name: item.name ?? '',
            price: item.price ?? 0,
            imageUrl: Array.isArray(item.imageUrls)
              ? item.imageUrls[0] || ''
              : item.imageUrl || '',
          });

          if (Array.isArray(response)) {
            return response.map(mapToCard);
          } else {
            return [mapToCard(response)];
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
