// src\app\pages\home-page\home-page.component.ts

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureService } from '~/src/app/services/furniture.service';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Furniture } from '~/src/app/models/furniture.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DataView, ButtonModule, Tag],
  templateUrl: './home-page.component.html',
})
export class HomePage implements OnInit {
  furnitures = signal(<Furniture[]>[]);
  loading = true;
  error = false;

  furnitureService = inject(FurnitureService);

  ngOnInit(): void {
    this.furnitureService.getFurnitures().subscribe({
      next: (data) => this.furnitures.set(data),
    });
  }

  getSeverity(furniture: Furniture) {
    const status = (furniture.status || '').toUpperCase();
    if (status === 'AVAILABLE') return 'success';
    if (status === 'OUT_OF_STOCK' || status === 'OUTOFSTOCK') return 'danger';
    if (status === 'LOW' || status === 'LOWSTOCK') return 'warn';
    return 'info';
  }

  getDisplayStatus(furniture: Furniture) {
    const status = (furniture.status || '').toUpperCase();
    if (status === 'AVAILABLE') return 'Available';
    if (status === 'OUT_OF_STOCK' || status === 'OUTOFSTOCK')
      return 'Out of Stock';
    if (status === 'LOW' || status === 'LOWSTOCK') return 'Low Stock';
    return status || 'Unknown';
  }
}
