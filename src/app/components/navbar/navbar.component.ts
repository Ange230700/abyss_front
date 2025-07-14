// src\app\components\navbar\navbar.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MenubarModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
