import { ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"cardgame-f9590","appId":"1:756454300951:web:f6d95f6963dc59c381eb52","storageBucket":"cardgame-f9590.firebasestorage.app","apiKey":"AIzaSyCAjHUj2wwwSX0Da1GIyCZT_Joefa7bSag","authDomain":"cardgame-f9590.firebaseapp.com","messagingSenderId":"756454300951"}))), importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync()]
};
