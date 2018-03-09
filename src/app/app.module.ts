import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { createStore, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppStore } from './app-store';
import { default as reducer, AppState, logger } from './app-state';

export function createAppStore(): Store<AppState> {
  return createStore<AppState>(reducer, composeWithDevTools(
    applyMiddleware(logger)
  );
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: AppStore, useFactory: createAppStore }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
