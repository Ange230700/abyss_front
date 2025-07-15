// src\app\pages\furniture-management\furniture-management.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FurnitureService } from '~/src/app/services/furniture.service';
import { CardFurniture } from '~/src/app/models/card-furniture.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-furniture-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './furniture-management.component.html',
})
export class FurnitureManagementPage implements OnInit {
  furnitures: CardFurniture[] = [];
  loading = true;
  error = false;
  pageNumber = 1;
  totalPages = 1;

  constructor(
    private readonly furnitureService: FurnitureService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadFurnitures();
  }

  loadFurnitures(): void {
    // If you add pagination parameters to your API, include pageNumber here
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
    // Navigate to an edit page (for example, '/furniture-edit/:id') or reuse details page
    this.router.navigate(['/furniture-edit', id]);
  }

  deleteFurniture(id: number): void {
    if (confirm('Are you sure you want to delete this furniture?')) {
      this.furnitureService.deleteFurniture(id).subscribe({
        next: () => {
          // Optionally display a success message here
          this.loadFurnitures();
        },
        error: (err) => {
          console.error('Error deleting furniture', err);
          // Optionally display an error message here
        },
      });
    }
  }
}
