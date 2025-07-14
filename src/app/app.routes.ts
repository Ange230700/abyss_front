// src\app\app.routes.ts

import { Routes } from '@angular/router';

import { FurnitureDetailsPage } from '~/src/app/pages/furniture-details/furniture-details.component';
import { FurnitureManagementPage } from '~/src/app/pages/furniture-management/furniture-management.component';
import { FurnitureAddPage } from '~/src/app/pages/furniture-add/furniture-add.component';
import { FurnitureEditPage } from '~/src/app/pages/furniture-edit/furniture-edit.component';
import { HomePage } from '~/src/app/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'furniture/:id', component: FurnitureDetailsPage },
  { path: 'furniture-management', component: FurnitureManagementPage },
  { path: 'furniture-add', component: FurnitureAddPage },
  { path: 'furniture-edit/:id', component: FurnitureEditPage },
];
