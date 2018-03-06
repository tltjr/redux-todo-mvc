import { Component, Inject } from '@angular/core';
import { Todo } from './todo';
import * as Redux from 'redux';
import { AppStore } from './app-store';
import { AppState } from './app-state';

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
      this.store.dispatch({
          type: 'ADD_TODO',
          payload: {
            newTodo: this.newTodoText.trim()
          }
        });
    }
  }

  removeTodo(todo: Todo): void {
    this.store.dispatch({
        type: 'REMOVE_TODO',
        payload: {
          todo: todo
        }
      });
  }

	editTodo(index: number) {
    this.store.dispatch({ 
        type: 'START_EDIT',
        payload: {
          index: index
        }
      });
	}

  toggleCompletion(index: number): void {
    this.store.dispatch({ 
        type: 'TOGGLE_COMPLETION',
        payload: {
          index: index
        }
      });
  }

  getActiveTodos(): Todo[] {
    return this.todos.filter(todo => !todo.isCompleted);
  }

  clearCompleted(): void {
    this.store.dispatch({ 
      type: 'CLEAR_COMPLETED',
      payload: null
    });
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

