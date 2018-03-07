import { Component, Inject } from '@angular/core';
import { Todo } from './todo';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from './app-state';
import { 
  addTodo,
  updateTodo,
  removeTodo,
  clearCompleted,
  startEdit,
  cancelEdit,
  toggleCompletion
} from './actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  $newTodoText: string;
  $todos: Todo[] = [];
  private subscription;

  constructor(private store: Store<AppState>) {
    this.subscription = this.store
        .subscribe((appState: any) => {
          this.$todos = appState.reducer.todos;
      });
    this.subscription = this.store
        .subscribe((appState: any) => {
          this.$newTodoText = appState.reducer.newTodoText;
      });
  }

  addTodo(): void {
    if (this.$newTodoText.trim().length) {
      this.store.dispatch(addTodo(this.$newTodoText.trim()));
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

  getActiveCount(): number {
    return (typeof this.$todos != 'undefined')
        ? this.$todos.filter(todo => !todo.isCompleted).length : 0;
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

