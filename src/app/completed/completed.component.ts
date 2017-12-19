import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../todo';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.http.get<Todo[]>('http://localhost:55855/api/todos/completed')
      .subscribe(todos => {
        this.todos = todos;
      });
  }
}
