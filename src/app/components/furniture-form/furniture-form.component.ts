// src\app\components\furniture-form\furniture-form.component.ts

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FurnitureType } from '~/src/app/models/furniture-type.model';
import { Material } from '~/src/app/models/material.model';
import { FurnitureFormData } from '~/src/app/models/furniture-form-data.model';

@Component({
  selector: 'app-furniture-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './furniture-form.component.html',
})
export class FurnitureFormComponent implements OnInit, OnChanges {
  @Input() initialData: FurnitureFormData | null = null;
  @Input() furnitureTypes: FurnitureType[] = [];
  @Input() materials: Material[] = [];
  @Input() statuses: string[] = [
    'Disponible',
    'Rupture de stock',
    'Discontinué',
  ];
  @Input() loading: boolean = false;
  @Output() formSubmit: EventEmitter<FurnitureFormData> =
    new EventEmitter<FurnitureFormData>();

  furnitureForm!: FormGroup;
  error: string = '';

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    // Initial population if initialData is already set
    if (this.initialData) {
      this.populateForm(this.initialData);
    }
  }

  // Detect changes on input properties
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData']?.currentValue) {
      this.populateForm(changes['initialData'].currentValue);
    }
  }

  private buildForm(): void {
    this.furnitureForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required],
      colour: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      status: ['Disponible', Validators.required],
      typeId: [null, Validators.required],
      materialIds: this.fb.array([]),
      imageUrls: this.fb.array([this.fb.control('')]),
    });
  }

  private populateForm(data: FurnitureFormData): void {
    // Map backend status to French display status
    const statusMap: { [key: string]: string } = {
      AVAILABLE: 'Disponible',
      OUT_OF_STOCK: 'Rupture de stock',
      DISCONTINUED: 'Discontinué',
    };

    this.furnitureForm.patchValue({
      name: data.name,
      description: data.description,
      size: data.size,
      colour: data.colour,
      quantity: data.quantity,
      price: data.price,
      status: statusMap[data.status] || data.status,
      typeId:
        data.typeId ??
        (data.type ? this.getTypeIdFromTypeName(data.type) : null),
    });
    const materialIdsArray = this.furnitureForm.get('materialIds') as FormArray;
    // Clear previous controls if needed
    materialIdsArray.clear();
    if (Array.isArray(data.materialIds)) {
      data.materialIds.forEach((id: number) => {
        materialIdsArray.push(this.fb.control(id));
      });
    }
    const imageUrlsArray = this.furnitureForm.get('imageUrls') as FormArray;
    imageUrlsArray.clear();
    if (data.imageUrls && data.imageUrls.length > 0) {
      data.imageUrls.forEach((url: string) => {
        imageUrlsArray.push(this.fb.control(url));
      });
    } else {
      imageUrlsArray.push(this.fb.control(''));
    }
  }

  get imageUrls(): FormArray {
    return this.furnitureForm.get('imageUrls') as FormArray;
  }

  addImageUrl(): void {
    this.imageUrls.push(this.fb.control(''));
  }

  removeImageUrl(index: number): void {
    this.imageUrls.removeAt(index);
  }

  onMaterialChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const materialIds = this.furnitureForm.get('materialIds') as FormArray;
    const id = +input.value;
    if (input.checked) {
      materialIds.push(this.fb.control(id));
    } else {
      const index = materialIds.value.indexOf(id);
      if (index > -1) {
        materialIds.removeAt(index);
      }
    }
  }

  submit(): void {
    if (this.furnitureForm.invalid) {
      this.error = 'Veuillez remplir tous les champs requis.';
      return;
    }
    this.error = '';
    this.formSubmit.emit(this.furnitureForm.value);
  }

  private getTypeIdFromTypeName(typeName: string): number | null {
    const found = this.furnitureTypes.find((t) => t.name === typeName);
    return found ? found.id : null;
  }
}
