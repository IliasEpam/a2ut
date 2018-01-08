import { ActionReducer, Action } from '@ngrx/store';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
let initialState = !!JSON.parse(localStorage.getItem('ment'));

export const loginReducer: ActionReducer<any> = (store: any = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN: 
      return true;
    case LOGOUT:
      return false;
    default:
      return store;
  }
}