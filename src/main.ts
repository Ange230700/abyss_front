// src\main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from '~/src/app/app.config';
import { App } from '~/src/app/app';

bootstrapApplication(App, {
  providers: [provideHttpClient(withFetch()), ...appConfig.providers],
}).catch((err) => console.error(err));
