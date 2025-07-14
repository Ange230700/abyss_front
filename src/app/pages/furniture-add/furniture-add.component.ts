// src\app\pages\furniture-add\furniture-add.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FurnitureService } from '~/src/app/services/furniture.service';
import { FurnitureType } from '~/src/app/models/furniture-type.model';
import { Material } from '~/src/app/models/material.model';
import { FurnitureFormComponent } from '~/src/app/components/furniture-form/furniture-form.component';
import { FurnitureFormData } from '~/src/app/models/furniture-form-data.model';

@Component({
  selector: 'app-furniture-add',
  standalone: true,
  imports: [CommonModule, FurnitureFormComponent],
  templateUrl: './furniture-add.component.html',
})
export class FurnitureAddPage implements OnInit {
  furnitureTypes: FurnitureType[] = [];
  materials: Material[] = [];
  statuses: string[] = ['Disponible', 'Rupture de stock', 'Discontinué'];
  error: string = '';
  loading: boolean = false;

  constructor(
    private readonly furnitureService: FurnitureService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadFurnitureTypes();
    this.loadMaterials();
  }

  loadFurnitureTypes(): void {
    this.furnitureService.getFurnitureTypes().subscribe({
      next: (data) => {
        this.furnitureTypes = data;
      },
      error: (err) =>
        console.error('Erreur lors du chargement des types:', err),
    });
  }

  loadMaterials(): void {
    this.furnitureService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
      },
      error: (err) =>
        console.error('Erreur lors du chargement des matériaux:', err),
    });
  }

  // Use the form data emitted from the child component directly.
  submitForm(formData: FurnitureFormData): void {
    if (!formData) {
      this.error = 'Veuillez remplir tous les champs requis.';
      return;
    }
    this.loading = true;
    this.furnitureService.createFurniture(formData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/furniture-management']);
      },
      error: (err) => {
        console.error('Erreur lors de la création du meuble', err);
        this.error = 'Une erreur est survenue lors de la création du meuble.';
        this.loading = false;
      },
    });
  }
}
