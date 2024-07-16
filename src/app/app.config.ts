import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideZoneChangeDetection({ eventCoalescing: true })
      , provideRouter(routes, withHashLocation()),
      provideHttpClient(),
      provideClientHydration(),
      provideAnimations()
    ]
};
