import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { createStore } from 'redux';
import { AppStore } from './app-store';
import { default as reducer } from './app-state';

export function storeFactory() {
    const enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;
    const store = enhancer(reducer);
    return store;
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
    { provide: AppStore, useFactory: storeFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
