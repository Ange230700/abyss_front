// src\app\app.config.ts

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { MyPreset } from '~/src/styles';
import { routes } from '~/src/app/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      zIndex: {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100,
      },
      inputVariant: 'filled',
      theme: {
        preset: MyPreset,
        options: {
          prefix: 'prime',
          darkModeSelector: '.prime-dark-mode',
          cssLayer: false,
        },
      },
    }),
  ],
};
