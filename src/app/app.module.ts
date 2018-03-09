import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { createStore, StoreEnhancer, compose, Store, applyMiddleware } from 'redux';
import { AppStore } from './app-store';
import { default as reducer, AppState, logger } from './app-state';

const devtools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

export function createAppStore(): Store<AppState> {
  return createStore<AppState>(
    reducer,
    devtools
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
