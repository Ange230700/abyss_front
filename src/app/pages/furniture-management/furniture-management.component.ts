// src\app\pages\furniture-management\furniture-management.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FurnitureService } from '~/src/app/services/furniture.service';
import { CommonModule } from '@angular/common';
import { Furniture } from '~/src/app/models/furniture.model';

@Component({
  selector: 'app-furniture-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './furniture-management.component.html',
})
export class FurnitureManagementPage implements OnInit {
  furnitures: Furniture[] = [];
  loading = true;
  error = false;

  constructor(
    private readonly furnitureService: FurnitureService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadFurnitures();
  }

  loadFurnitures(): void {
    this.furnitureService.getFurnitures().subscribe({
      next: (data) => {
        this.furnitures = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading furniture', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  editFurniture(id: number): void {
    this.router.navigate(['/furniture-edit', id]);
  }

  deleteFurniture(id: number): void {
    if (confirm('Are you sure you want to delete this furniture?')) {
      this.furnitureService.deleteFurniture(id).subscribe({
        next: () => {
          this.loadFurnitures();
        },
        error: (err) => {
          console.error('Error deleting furniture', err);
        },
      });
    }
  }
}
