import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodoText: string = '';
  todos: Todo[] = [];

  addTodo(): void {
    if (this.newTodoText.trim().length) {
      var todo = new Todo(this.newTodoText);
      this.todos.push(todo);
      this.newTodoText = '';
    }
  }

  removeTodo(todo: Todo): void {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

	cancelEditTodo(todo: Todo): void {
		todo.isBeingEdited = false;
	}

	updateTodo(todo: Todo, editedTitle: string): void {
		editedTitle = editedTitle.trim();
		todo.isBeingEdited = false;

		if (editedTitle.length === 0) {
      this.removeTodo(todo);
			return;
		}
		todo.title = editedTitle;
	}

	editTodo(todo: Todo) {
		todo.isBeingEdited = true;
	}

  toggleCompletion(todo: Todo): void {
    todo.isCompleted = !todo.isCompleted;
  }
}
