// src\app\services\furniture.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '~/src/environments/environment';
import { Material } from '~/src/app/models/material.model';
import { Furniture } from '~/src/app/models/furniture.model';

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  private readonly apiUrl = `${environment.apiBaseUrl}`;

  constructor(private readonly http: HttpClient) {}

  getFurnitures(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`${this.apiUrl}/furnitures`);
  }

  getFurnitureByIdForDetails(id: number): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.apiUrl}/furnitures/${id}`);
  }

  deleteFurniture(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/furnitures/${id}`);
  }

  createFurniture(furnitureData: Furniture): Observable<Furniture> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, deleted_at, ...payload } = furnitureData;
    return this.http.post<Furniture>(`${this.apiUrl}/furniture`, payload);
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/materials`);
  }

  updateFurniture(id: number, furnitureData: Furniture) {
    return this.http.patch<Furniture>(
      `${this.apiUrl}/furnitures/${id}`,
      furnitureData,
    );
  }
}
