import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HistoricComponent } from './layout/routes/historic/historic.component';
import { PayableComponent } from './layout/routes/payable/payable.component';
import { ChecklistComponent } from './layout/routes/checklist/checklist.component';
import { PaidComponent } from './layout/routes/paid/paid.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ContasService } from './services/firestore.service';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {connectFirestoreEmulator, getFirestore, provideFirestore} from '@angular/fire/firestore';
import {connectStorageEmulator, getStorage, provideStorage} from '@angular/fire/storage';
import {Auth, connectAuthEmulator, getAuth, provideAuth} from '@angular/fire/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD89o0qg29MiWVWO7Sebdi3C1L03BWIwTo",
  authDomain: "contas-b9187.firebaseapp.com",
  projectId: "contas-b9187",
  storageBucket: "contas-b9187.appspot.com",
  messagingSenderId: "1011071984258",
  appId: "1:1011071984258:web:343dfbf40c40c98c33ca9b"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    HistoricComponent,
    PayableComponent,
    ChecklistComponent,
    PaidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
     
  ],
  providers: [ContasService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
