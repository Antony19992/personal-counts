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

import { initializeApp } from "firebase/app";
import { FirestoreService } from './services/firestore.service';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD89o0qg29MiWVWO7Sebdi3C1L03BWIwTo",
  authDomain: "contas-b9187.firebaseapp.com",
  projectId: "contas-b9187",
  storageBucket: "contas-b9187.appspot.com",
  messagingSenderId: "1011071984258",
  appId: "1:1011071984258:web:343dfbf40c40c98c33ca9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
    CommonModule
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
