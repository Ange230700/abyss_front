// src\app\pages\home-page\home-page.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureService } from '~/src/app/services/furniture.service';
import { CardFurniture } from '~/src/app/models/card-furniture.model';
import { FurnitureCardComponent } from '~/src/app/components/card-furniture/card-furniture.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FurnitureCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePage implements OnInit {
  cardFurnitures: CardFurniture[] = [];
  loading = true;
  error = false;

  constructor(private readonly furnitureService: FurnitureService) {}

  ngOnInit(): void {
    this.loadFurnitures();
  }

  private loadFurnitures() {
    this.furnitureService.getFurnitures().subscribe({
      next: (data) => {
        this.cardFurnitures = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données', err);
        this.error = true;
        this.loading = false;
      },
    });
  }
}
