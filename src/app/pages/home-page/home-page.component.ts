// src\app\pages\home-page\home-page.component.ts

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureService } from '~/src/app/services/furniture.service';
import { CardFurniture } from '~/src/app/models/card-furniture.model';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    /*FurnitureCardComponent,*/ DataView,
    ButtonModule,
    Tag,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePage implements OnInit {
  furnitures = signal<CardFurniture[]>([]);
  loading = true;
  error = false;

  constructor(private readonly furnitureService: FurnitureService) {}

  ngOnInit(): void {
    this.loadFurnitures();
  }

  private loadFurnitures() {
    this.furnitureService.getFurnitures().subscribe({
      next: (data) => {
        this.furnitures.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  getSeverity(/*furniture: CardFurniture*/) {
    // Optionally, you can implement logic based on furniture status or stock.
    // Here, let's assume all are 'INSTOCK' for a basic tag, or you can adjust.
    // if (furniture.stock === 'INSTOCK') {
    //   return 'info';
    // }
    // if (furniture.stock === 'LOW') {
    //   return 'warning';
    // }
    return 'success';
  }
}
