// src\app\components\navbar\navbar.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, Menubar, ButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  colorMode: 'light' | 'dark' = 'dark';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Administration',
        icon: 'pi pi-cog',
        routerLink: '/furniture-management',
      },
      {
        label: 'Ajouter un meuble',
        icon: 'pi pi-plus',
        routerLink: '/furniture-add',
      },
    ];
    const savedMode = localStorage.getItem('colorMode');

    if (savedMode === 'light' || savedMode === 'dark') {
      this.colorMode = savedMode;
    } else {
      this.colorMode = document.documentElement.classList.contains(
        'prime-dark-mode',
      )
        ? 'dark'
        : 'light';
    }

    if (this.colorMode === 'dark') {
      document.documentElement.classList.add('prime-dark-mode');
    } else {
      document.documentElement.classList.remove('prime-dark-mode');
    }
  }

  toggleDarkMode() {
    const element = document.documentElement;
    if (this.colorMode === 'dark') {
      element.classList.remove('prime-dark-mode');
      this.colorMode = 'light';
    } else {
      element.classList.add('prime-dark-mode');
      this.colorMode = 'dark';
    }
    localStorage.setItem('colorMode', this.colorMode);
  }
}
