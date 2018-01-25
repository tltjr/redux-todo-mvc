import { IAppAction } from './app-state';
import { Todo } from './todo';

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const START_EDIT = 'START_EDIT'
export const TODOS_RETRIEVED = 'TODOS_RETRIEVED'
export const CANCEL_EDIT = 'CANCEL_EDIT'
export const UPDATE_TODO = 'UPDATE_TODO'

export const addTodo = (text: string): IAppAction => {
  return {
    type: ADD_TODO,
    payload: {
      newTodo: text
    }
  }
}

export const removeTodo = (todo: Todo): IAppAction => {
  return {
    type: REMOVE_TODO,
    payload: {
      todo: todo
    }
  }
}

export const clearCompleted = (): IAppAction => {
  return { type: CLEAR_COMPLETED, payload: null }
}

export const startEdit = (index: number): IAppAction => {
  return { 
    type: START_EDIT,
    payload: {
      index: index
    }
  }
}

export const todosRetrieved = (todos: Todo[]): IAppAction => {
  return { 
    type: TODOS_RETRIEVED,
    payload: {
      todos: todos
    }
  }
}

export const cancelEdit = (index: number): IAppAction => {
  return { 
    type: CANCEL_EDIT,
    payload: {
      index: index
    }
  }
}

export const updateTodo = (index: number, editedTitle: string): IAppAction => {
  return { 
    type: UPDATE_TODO,
    payload: {
      index: index,
      title: editedTitle
    }
  }
}

