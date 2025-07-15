// src\app\pages\home-page\home-page.component.ts

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureService } from '~/src/app/services/furniture.service';
import { CardFurniture } from '~/src/app/models/card-furniture.model';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ImgFallbackDirective } from '~/src/app/directives/img-fallback.directive';
import { CardFurnitureWithImages } from '~/src/app/models/card-furniture-with-images.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DataView, ButtonModule, Tag, ImgFallbackDirective],
  templateUrl: './home-page.component.html',
})
export class HomePage implements OnInit {
  furnitures = signal<CardFurniture[]>([]);
  loading = true;
  error = false;

  furnitureService = inject(FurnitureService);

  ngOnInit(): void {
    this.furnitureService.getFurnitures().subscribe({
      next: (data) => this.furnitures.set(data),
    });
  }

  getSeverity(furniture: CardFurniture) {
    const status = (furniture.status || '').toUpperCase();
    if (status === 'AVAILABLE') return 'success';
    if (status === 'OUT_OF_STOCK' || status === 'OUTOFSTOCK') return 'danger';
    if (status === 'LOW' || status === 'LOWSTOCK') return 'warn';
    return 'info';
  }

  getDisplayStatus(furniture: CardFurniture) {
    const status = (furniture.status || '').toUpperCase();
    if (status === 'AVAILABLE') return 'Available';
    if (status === 'OUT_OF_STOCK' || status === 'OUTOFSTOCK')
      return 'Out of Stock';
    if (status === 'LOW' || status === 'LOWSTOCK') return 'Low Stock';
    return status || 'Unknown';
  }

  getImage(item: CardFurnitureWithImages): string {
    // Use fallback logic as requested
    return item.imageUrl || item.imageUrls?.[0] || '/assets/default.jpg';
  }
}
