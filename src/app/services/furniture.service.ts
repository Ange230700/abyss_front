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
import { normalizeImageUrls } from '~/src/app/utils/image-utils';

type RawCardFurniture = {
  id?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
  imageUrls?: string[];
};

type FurnitureDetailsApiResponse = FurnitureDetails & {
  imageUrl?: string;
  imageUrls?: string[];
  materialNames?: string[];
  materialIds?: number[];
  materials?: string[];
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
          const mapToCard = (item: RawCardFurniture): CardFurniture => {
            const images = normalizeImageUrls(item);
            return {
              id: item.id ?? 0,
              name: item.name ?? '',
              price: item.price ?? 0,
              imageUrl: images[0] ?? '',
            };
          };

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
      .get<FurnitureDetailsApiResponse>(`${this.apiUrl}/furnitures/${id}`)
      .pipe(
        map((response) => {
          return {
            ...response,
            imageUrls: normalizeImageUrls(response),
            materials: response.materialNames || response.materials || [],
          };
        }),
      );
  }

  getFurnitureByIdForForm(id: number): Observable<FurnitureDetails> {
    return this.http
      .get<FurnitureDetailsApiResponse>(`${this.apiUrl}/furnitures/${id}`)
      .pipe(
        map((response) => {
          return {
            ...response,
            imageUrls: normalizeImageUrls(response),
            materials: [],
          };
        }),
      );
  }

  deleteFurniture(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/furnitures/${id}`);
  }

  createFurniture(
    furnitureData: FurnitureFormData,
  ): Observable<FurnitureDetails> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...payload } = furnitureData;
    return this.http.post<FurnitureDetails>(
      `${this.apiUrl}/furniture`,
      payload,
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
      `${this.apiUrl}/furnitures/${id}`,
      furnitureData,
    );
  }
}
