import { Action } from 'redux';

export interface IAppAction extends Action {
  type: string;
  payload: any;
}

export const initialState = {
  'todos': []
};

export const reducer =
  (state, action: IAppAction) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {'todos': [{'title': action.payload.newTodo}]};
      default:
        return state;
      }
  };

export default reducer;
