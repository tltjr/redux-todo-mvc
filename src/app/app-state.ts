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
        let maxId = 0;
        for (let todo of state.todos) {
          if (todo.id > maxId) {
            maxId = todo.id
          }
        }
        let newTodo = new Todo(action.payload.newTodo);
        newTodo.id = ++maxId;
        //return Object.assign({}, state, { todos: [...state.todos, newTodo] });
        return { ...state, todos: [...state.todos, newTodo] };
      case 'REMOVE_TODO':
        //return Object.assign({}, state, { todos: state.todos.filter(t => t !== action.payload.todo) });
        return { ...state, todos: state.todos.filter(t => t !== action.payload.todo) };
      case 'START_EDIT':
        const todosStartEdit = state.todos.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          //return Object.assign({}, item, { isBeingEdited: true, index: action.payload.index });
          return { ...item, isBeingEdited: true, index: action.payload.index };
        });
        return Object.assign({}, state, { todos: todosStartEdit });
      case 'CANCEL_EDIT':
        const todosCancelEdit = state.todos.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          //return Object.assign({}, item, { isBeingEdited: false });
          return { ...item, isBeingEdited: false };
        });
        return { ...state, todos: todosCancelEdit };
      case 'UPDATE_TODO':
        if (action.payload.title.length === 0) {
          return { ...state,
            todos: [
              ...state.todos.slice(0, action.payload.index),
              ...state.todos.slice(action.payload.index + 1)
            ]
          };
        } 
        else {
          const todosUpdated = state.todos.map((item, index) => {
            if (index !== action.payload.index) {
              return item;
            }
            return { ...item, title: action.payload.title, isBeingEdited: false };
          });
          return { ...state, todos: todosUpdated };
        }
      case 'CLEAR_COMPLETED':
        return { ...state, todos: state.todos.filter(todo => !todo.isCompleted) };
      case 'TOGGLE_COMPLETION':
        const todosToggleCompletion = state.todos.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return { ...item, isCompleted: !item.isCompleted };
        });
        return { ...state, todos: todosToggleCompletion };
      default:
        return state;
      }
  };

export default reducer;
