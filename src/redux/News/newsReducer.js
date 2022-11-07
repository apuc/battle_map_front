import {
  GET_NEWS, IS_LOADING,
  SET_CURRENT_PAGE,
  SET_ID_ACTIVE_NEWS,
  SET_NEWS,
  SUPPLEMENT_NEWS,
  TOGGLE_IS__FETCHING, TOGGLE_NEWS
} from './newsConstants'

let initialState = {
  news: [],
  meta: null,
  fetching: false,
  idActiveNews: null,
  currentPage: 1,
  isShowEvents: true,
  isLoading: false,
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
    case TOGGLE_NEWS:
      return {
        ...state,
        isShowEvents: !state.isShowEvents,
      }
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}
