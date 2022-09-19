import {GET_NEWS,SET_NEWS, TOGGLE_IS__FETCHING} from './newsConstants'

let initialState = {
  news: [],
  meta: null,
  fetching: true
}

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: [...state.news, ...action.payload.news],
        meta: action.payload._meta
      }
    case TOGGLE_IS__FETCHING:
      return {
        ...state,
        fetching: action.payload,
      }
    default:
      return state
  }
}
