import { Todo } from './todo';
import { Action } from 'redux';
import { 
  ADD_TODO,
  REMOVE_TODO,
  START_EDIT,
  CANCEL_EDIT,
  UPDATE_TODO,
  CLEAR_COMPLETED,
  TOGGLE_COMPLETION
} from './actions'; 

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
      case ADD_TODO:
        let maxId = 0;
        for (let todo of state.todos) {
          if (todo.id > maxId) {
            maxId = todo.id
          }
        }
        let newTodo = new Todo(action.payload.newTodo);
        newTodo.id = ++maxId;
        return { ...state, todos: [...state.todos, newTodo] };
      case REMOVE_TODO:
        return { ...state, todos: state.todos.filter(t => t !== action.payload.todo) };
      case START_EDIT:
        var updatedTodos = state.todos.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return Object.assign({}, item, { isBeingEdited: true, index: action.payload.index });
        });
        return { ...state, todos: updatedTodos };
      case CANCEL_EDIT:
        var updatedTodos = state.todos.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return { ...item, isBeingEdited: false };
        });
        return { ...state, todos: updatedTodos };
      case UPDATE_TODO:
        if (action.payload.title.length === 0) {
          return { ...state, todos: [
              ...state.todos.slice(0, action.payload.index),
              ...state.todos.slice(action.payload.index + 1)
            ]
          };
        } 
        else {
          var updatedTodos = state.todos.map((item, index) => {
            if (index !== action.payload.index) {
              return item;
            }
            return Object.assign({}, item, { title: action.payload.title, isBeingEdited: false });
          });
          return { ...state, todos: updatedTodos };
        }
      case CLEAR_COMPLETED:
        return { ...state, todos: state.todos.filter(todo => !todo.isCompleted) };
      case TOGGLE_COMPLETION:
        var updatedTodos = state.todos.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return { ...item, isCompleted: !item.isCompleted };
        });
        return { ...state, todos: updatedTodos };
      default:
        return state;
      }
  };

export default reducer;
