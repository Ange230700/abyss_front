// src\app\components\header\header.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '~/src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  imageUrl: string = 'assets/header-photo.webp';
  showHero: boolean = true;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // Listen for route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Only show the hero image when on the home page ("/")
        this.showHero = event.urlAfterRedirects === '/';
      });
  }
}
