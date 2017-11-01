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
}
