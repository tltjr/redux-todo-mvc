import { Todo } from './todo';
import { Action } from 'redux';

export interface AppState {
  todos: Todo[];
  newTodoText: string;
}

export interface IAppAction extends Action {
  type: string;
  payload: any;
}

export const initialState: AppState = {
  todos: [],
  newTodoText: ''
};

export const reducer =
  (state: AppState = initialState, action: IAppAction): AppState => {
    switch (action.type) {
      case 'ADD_TODO':
        // temp id
        let maxId = 0;
        for (let todo of state.todos) {
          if (todo.id > maxId) {
            maxId = todo.id
          }
        }
        let newTodo = new Todo(action.payload.newTodo);
        newTodo.id = ++maxId;
        return Object.assign(state, { todos: [...state.todos, newTodo] });
      case 'REMOVE_TODO':
        return Object.assign(state, { todos: state.todos.filter(t => t !== action.payload.todo) });
      case 'START_EDIT':
        var newState = {...state};
        const index = action.payload.index;
        newState.todos[index].isBeingEdited = true;
        newState.todos[index].index = index;
        return newState;
      case 'CANCEL_EDIT':
        var newState = {...state};
        newState.todos[action.payload.index].isBeingEdited = false;
        return newState;
      case 'UPDATE_TODO':
        var newState = {...state};
        newState.todos[action.payload.index].title = action.payload.title;
        newState.todos[action.payload.index].isBeingEdited = false;
        return newState;
      case 'TODOS_RETRIEVED':
        return Object.assign(state, { todos: action.payload.todos });
      case 'CLEAR_COMPLETED':
        return Object.assign(state, { todos: state.todos.filter(todo => !todo.isCompleted) });;
      default:
        return state;
      }
  };

export default reducer;
