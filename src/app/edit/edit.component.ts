import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { Todo } from '../todo';
import * as Redux from 'redux';
import { AppStore } from '../app-store';
import { AppState } from '../app-state';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  @Input()
  todo: Todo;

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>) {
  }

	cancelEditTodo(index: number): void {
    this.store.dispatch({
      type: 'CANCEL_EDIT',
      payload: {
        index: index
      }
    });
	}

	updateTodo(index: number, editedTitle: string): void {
    this.store.dispatch({
      type: 'UPDATE_TODO',
      payload: {
        index: index,
        title: editedTitle
      }
    });
	}
}

