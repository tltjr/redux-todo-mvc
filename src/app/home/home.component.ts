import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../todo';
import { NotificationsService } from 'angular4-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newTodoText: string = '';
  todos: Todo[] = [];

  constructor(private readonly http: HttpClient, private notificationsService: NotificationsService) {
  }

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

  getActiveTodos(): Todo[] {
    return this.todos.filter(todo => !todo.isCompleted);
  }

  clearCompleted(): void {
    this.todos = this.getActiveTodos();
  }

  save(): void {
    this.http.post<Todo[]>('http://localhost:55855/api/todos/save', this.todos)
      .subscribe(todos => {
        this.todos = todos;
        this.notificationsService.success('Success!', 'Todos saved', { 
          timeOut: 2000,
          showProgressBar: false
        });
      });
  }

  ngOnInit(): void {
    this.http.get<Todo[]>('http://localhost:55855/api/todos')
      .subscribe(todos => {
        this.todos = todos;
      });
  }
}
