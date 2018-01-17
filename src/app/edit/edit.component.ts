import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  @Input()
  todo: Todo;

  @Output()
  update: EventEmitter<Todo>;
  @Output()
  cancel: EventEmitter<Todo>;

  constructor() {
    this.update = new EventEmitter<Todo>();
    this.cancel = new EventEmitter<Todo>();
  }

	cancelEditTodo(todo: Todo): void {
    this.cancel.emit(todo);
	}

	updateTodo(todo: Todo, editedTitle: string): void {
    this.cancel.emit(todo);
    todo.title = editedTitle.trim();
    // if the title has been deleted, we want to remove this todo from the
    // parent collection
    this.update.emit(todo);
	}
}

