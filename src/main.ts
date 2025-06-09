import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import '@angular/common/locales/global/fr';
import '@angular/common/locales/global/be';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
