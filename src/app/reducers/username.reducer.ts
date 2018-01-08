import { ActionReducer, Action } from '@ngrx/store';

export const USERNAME = 'username';
export const LOGOUT = 'logout';
let initialState = JSON.parse(localStorage.getItem('ment-login'));

export const usernameReducer: ActionReducer<any> = (store: any = initialState, action: any) => {
  switch (action.type) {
    case USERNAME:
      return action.payload
    case LOGOUT:
      return null
    default:
      return store;
  }
}