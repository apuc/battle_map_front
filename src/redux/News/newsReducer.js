import {GET_NEWS, SET_NEWS} from './newsConstants'

let initialState = {
  news: []
}

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.payload
      }

    default:
      return state
  }
}
