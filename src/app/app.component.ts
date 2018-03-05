import { Component, Inject } from '@angular/core';
import { Todo } from './todo';
import * as Redux from 'redux';
import { AppStore } from './app-store';
import { AppState } from './app-state';
import { 
  addTodo,
  updateTodo,
  removeTodo,
  clearCompleted,
  startEdit,
  cancelEdit,
  todosRetrieved,
  toggleCompletion
} from './actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodoText: string = '';
  todos: Todo[] = [];

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>) {
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  updateState() {
    const appState: AppState = this.store.getState();
    if (typeof appState == 'undefined' || appState == null) {
      return;
    }
    this.todos = appState.todos;
    this.newTodoText = appState.newTodoText;
  }

  addTodo(): void {
    if (this.newTodoText.trim().length) {
      this.store.dispatch(addTodo(this.newTodoText.trim()));
    }
  }

  removeTodo(todo: Todo): void {
    this.store.dispatch(removeTodo(todo));
  }

	editTodo(index: number) {
    this.store.dispatch(startEdit(index));
	}

  toggleCompletion(index: number): void {
    this.store.dispatch(toggleCompletion(index));
  }

  getActiveTodos(): Todo[] {
    return this.todos.filter(todo => !todo.isCompleted);
  }

  clearCompleted(): void {
    this.store.dispatch(clearCompleted());
  }

	cancelEditTodo(index: number): void {
    this.store.dispatch(cancelEdit(index));
	}

	updateTodo(index: number, editedTitle: string): void {
    this.store.dispatch(updateTodo(index, editedTitle));
	}
}

