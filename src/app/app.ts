// src\app\app.ts

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '~/src/app/components/header/header.component';
import { FooterComponent } from '~/src/app/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('abyss_front');
}
