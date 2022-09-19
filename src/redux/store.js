import { applyMiddleware, combineReducers, compose } from 'redux'
import { createStore } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { geoJsonReducer } from './GeoJson/geoJsonReducer'
import { dateReducer } from './Date/dateReducer'
import thunk from 'redux-thunk'
import { newsReducer } from './News/newsReducer'

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['storeGeoJson']
// }

const persistConfigDates = {
  key: 'root-date',
  storage,
  blacklist: ['endDate', 'startDate', 'selectedDate']
}

let reducers = combineReducers({
  geoJson: geoJsonReducer,
  date: persistReducer(persistConfigDates, dateReducer),
  news: newsReducer
})

const store = createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export const persistor = persistStore(store)

export default store
