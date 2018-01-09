import { ActionReducer, Action } from '@ngrx/store';

export const UPDATECOURSES = 'updatecourses';

export const coursesReducer: ActionReducer<any> = (store: any = [], action: any) => {
  switch (action.type) {
    case UPDATECOURSES:
      return action.payload;
    default:
      return store;
  }
}