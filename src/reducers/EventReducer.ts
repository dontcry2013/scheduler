import { useReducer } from 'react';
import { IEventState } from '../components/Interface';

export const initialState: IEventState = {
  mouseOver: { top: 0, key: '0', },
}

export const eventReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_TOP':
      return { ...state, mouseOver: action.payload };
    default:
      throw new Error();
  }
}

export const useEventReducer = () => {
  return useReducer(eventReducer, initialState);
};
