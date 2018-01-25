import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../todo';
import { NotificationsService } from 'angular4-notifications';
import * as Redux from 'redux';
import { AppStore } from '../app-store';
import { AppState } from '../app-state';
import { 
  addTodo,
  removeTodo,
  clearCompleted,
  startEdit,
  todosRetrieved,
  toggleCompletion
} from '../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newTodoText: string = '';
  todos: Todo[] = [];

  constructor(private readonly http: HttpClient, private notificationsService: NotificationsService, @Inject(AppStore) private store: Redux.Store<AppState>) {
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

  save(): void {
    this.http.post<Todo[]>('http://localhost:55855/api/todos/save', this.todos)
      .subscribe(todos => {
        this.notificationsService.success('Success!', 'Todos saved', { 
          timeOut: 2000,
          showProgressBar: false
        });
      });
  }

  ngOnInit(): void {
    this.http.get<Todo[]>('http://localhost:55855/api/todos')
      .subscribe(todos => {
        this.store.dispatch(todosRetrieved(todos));
      });
  }
}
