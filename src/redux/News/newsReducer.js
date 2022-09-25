import {
  GET_NEWS,
  SET_CURRENT_PAGE,
  SET_ID_ACTIVE_NEWS,
  SET_NEWS,
  SUPPLEMENT_NEWS,
  TOGGLE_IS__FETCHING
} from './newsConstants'

let initialState = {
  news: [],
  meta: null,
  fetching: false,
  idActiveNews: null,
  currentPage: 1
}

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: [...state.news, ...action.payload.news],
        meta: action.payload._meta
      }
    case SUPPLEMENT_NEWS:
      return {
        ...state,
        news: action.payload.news,
        meta: action.payload._meta
      }
    case TOGGLE_IS__FETCHING:
      return {
        ...state,
        fetching: action.payload,
      }
    case SET_ID_ACTIVE_NEWS:
      return {
        ...state,
        idActiveNews: action.payload,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      }
    default:
      return state
  }
}
