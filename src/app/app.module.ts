import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular4-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CompletedComponent } from './completed/completed.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'completed', component: CompletedComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompletedComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} //typically just for debug
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
