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
        //traditional state mutation
        //state.todos.push(newTodo);
        //return state;
        // a typical redux return
        return Object.assign({}, state, { todos: [...state.todos, newTodo] });
        //const addNewTodos = [...state.todos, newTodo];
        //const addNewState = Object.assign({}, state, { todos: addNewTodos });
        //return addNewState;
      case 'REMOVE_TODO':
        return Object.assign({}, state, { todos: state.todos.filter(t => t !== action.payload.todo) });
        //const removeNewTodos = state.todos.filter(t => t !== action.payload.todo);
        //const removeNewState = Object.assign({}, state, { todos: removeNewTodos });
        //return removeNewState;
      case 'START_EDIT':
        var todosStartEdit = state.todos.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return Object.assign({}, item, { isBeingEdited: true, index: action.payload.index });
        });
        return Object.assign({}, state, { todos: todosStartEdit });
      case 'CANCEL_EDIT':
        var todosCancelEdit = state.todos.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return Object.assign({}, item, { isBeingEdited: false });
        });
        return Object.assign({}, state, { todos: todosCancelEdit });
      case 'UPDATE_TODO':
        if (action.payload.title.length === 0) {
          return Object.assign({}, state, {
            todos: [
              ...state.todos.slice(0, action.payload.index),
              ...state.todos.slice(action.payload.index + 1)
            ]
          });
        } 
        else {
          var updatedTodos = state.todos.map((item, index) => {
            if (index !== action.payload.index) {
              return item;
            }
            return Object.assign({}, item, { title: action.payload.title, isBeingEdited: false });
          });
          return Object.assign({}, state, { todos: updatedTodos });
        }
      case 'CLEAR_COMPLETED':
        return Object.assign({}, state, { todos: state.todos.filter(todo => !todo.isCompleted) });;
      case 'TOGGLE_COMPLETION':
        var todosToggleCompletion = state.todos.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return Object.assign({}, item, { isCompleted: !item.isCompleted });
        });
        return Object.assign({}, state, { todos: todosToggleCompletion });
      default:
        return state;
      }
  };

export default reducer;
