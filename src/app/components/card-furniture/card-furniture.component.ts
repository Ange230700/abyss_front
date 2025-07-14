// src\app\components\card-furniture\card-furniture.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardFurniture } from '~/src/app/models/card-furniture.model';

@Component({
  selector: 'card-furniture',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-furniture.component.html',
})
export class FurnitureCardComponent {
  @Input() furniture!: CardFurniture;
}
