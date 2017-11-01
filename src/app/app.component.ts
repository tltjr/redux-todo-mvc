import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodoText: string = '';
  todos: string[] = [];

  addTodo(): void {
    if (this.newTodoText.trim().length) {
      this.todos.push(this.newTodoText);
      this.newTodoText = '';
    }
  }
}
