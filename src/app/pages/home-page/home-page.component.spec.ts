// src\app\pages\home-page\home-page.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from '~/src/app/pages/home-page/home-page.component';
import { FurnitureService } from '~/src/app/services/furniture.service';
import { throwError } from 'rxjs';
import { Furniture } from '~/src/app/models/furniture.model';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let furnitureService: jasmine.SpyObj<FurnitureService>;

  const mockFurnitures: Furniture[] = [
    {
      id: 1,
      name: 'Chair',
      description: 'A comfy wooden chair',
      id_type: 2,
      size: 'M',
      colour: 'Brown',
      quantity: 10,
      price: 49.99,
      status: 'AVAILABLE',
      deleted_at: null,
    },
  ];

  beforeEach(waitForAsync(() => {
    const furnitureServiceSpy = jasmine.createSpyObj('FurnitureService', [
      'getFurnitures',
    ]);

    TestBed.configureTestingModule({
      imports: [CommonModule, HomePage],
      providers: [
        { provide: FurnitureService, useValue: furnitureServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    furnitureService = TestBed.inject(
      FurnitureService,
    ) as jasmine.SpyObj<FurnitureService>;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error when furniture fetch fails', () => {
    furnitureService.getFurnitures.and.returnValue(
      throwError(() => new Error('API error')),
    );

    fixture.detectChanges();

    expect(furnitureService.getFurnitures).toHaveBeenCalled();
    expect(component.furnitures()).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeTrue();
  });

  it('should return correct severity for status', () => {
    expect(
      component.getSeverity({ ...mockFurnitures[0], status: 'AVAILABLE' }),
    ).toBe('success');
    expect(
      component.getSeverity({ ...mockFurnitures[0], status: 'OUT_OF_STOCK' }),
    ).toBe('danger');
    expect(
      component.getSeverity({ ...mockFurnitures[0], status: 'LOW_STOCK' }),
    ).toBe('warn');
    expect(
      component.getSeverity({ ...mockFurnitures[0], status: 'UNKNOWN' }),
    ).toBe('info');
  });

  it('should return correct display status', () => {
    expect(
      component.getDisplayStatus({ ...mockFurnitures[0], status: 'AVAILABLE' }),
    ).toBe('Available');
    expect(
      component.getDisplayStatus({
        ...mockFurnitures[0],
        status: 'OUT_OF_STOCK',
      }),
    ).toBe('Out of Stock');
    expect(
      component.getDisplayStatus({ ...mockFurnitures[0], status: 'LOW_STOCK' }),
    ).toBe('Low Stock');
    expect(
      component.getDisplayStatus({ ...mockFurnitures[0], status: '???' }),
    ).toBe('???');
  });
});
