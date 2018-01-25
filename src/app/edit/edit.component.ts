import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { Todo } from '../todo';
import * as Redux from 'redux';
import { AppStore } from '../app-store';
import { AppState } from '../app-state';
import { cancelEdit, updateTodo } from '../actions';

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
    this.store.dispatch(cancelEdit(index));
	}

	updateTodo(index: number, editedTitle: string): void {
    this.store.dispatch(updateTodo(index, editedTitle));
	}
}

