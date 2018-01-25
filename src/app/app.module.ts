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
import { EditComponent } from './edit/edit.component';

import { createStore } from 'redux';
import { AppStore } from './app-store';
import { default as reducer } from './app-state';
import freezeState from 'redux-freeze-state';

export function storeFactory() {
    const enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;
    const store = enhancer(freezeState(reducer));
    return store;
}

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'completed', component: CompletedComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompletedComponent,
    EditComponent
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
  providers: [
    { provide: AppStore, useFactory: storeFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
