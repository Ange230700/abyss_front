// src\app\pages\furniture-details\furniture-details.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { FurnitureService } from '~/src/app/services/furniture.service';
import { Furniture } from '~/src/app/models/furniture.model';

interface GalleriaImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt?: string;
  title?: string;
}

interface ResponsiveOption {
  breakpoint: string;
  numVisible: number;
}

@Component({
  selector: 'app-furniture-details',
  standalone: true,
  imports: [CommonModule, GalleriaModule],
  templateUrl: './furniture-details.component.html',
})
export class FurnitureDetailsPage implements OnInit {
  furniture?: Furniture;
  images: GalleriaImage[] = [];
  responsiveOptions: ResponsiveOption[] = [
    { breakpoint: '1300px', numVisible: 4 },
    { breakpoint: '575px', numVisible: 1 },
  ];
  loading = true;
  error = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly furnitureService: FurnitureService,
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (!idParam || isNaN(id) || id <= 0) {
      console.error('ID de meuble invalide ou manquant.');
      this.error = true;
      this.loading = false;
      return;
    }
    this.loadFurnitureDetails(id);
  }

  private loadFurnitureDetails(id: number) {
    this.furnitureService.getFurnitureByIdForDetails(id).subscribe({
      next: (data) => {
        this.furniture = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }
}
