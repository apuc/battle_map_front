import {SET_GEO_JSON, SET_START_PLAYER, ZEROING_GEO_JSON_FOR_PERIOD} from './geoJsonConsts'

let initialState = {
   storeGeoJson: null,
   storeGeoJsonForPeriod: null,
   startPlayer: false
}

export const geoJsonReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_GEO_JSON:
         if (Array.isArray(action.payload.geoJsonData)) {
            return {
               ...state,
               storeGeoJsonForPeriod: action.payload.geoJsonData,
               storeGeoJson: action.payload.geoJsonData.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))[0].json_data
            }
         } else if (!action.payload.geoJsonData.json_data) {
            return {
               ...state,
               storeGeoJson: null,
               storeGeoJsonForPeriod: null
            }
         } else {
            return {
               ...state,
               storeGeoJson: action.payload.geoJsonData.json_data,
            }
         }
      case ZEROING_GEO_JSON_FOR_PERIOD:
         return {
            ...state,
            storeGeoJsonForPeriod: null
         }
      case SET_START_PLAYER:
         console.log(action)
         return {
            ...state,
            startPlayer: action.payload !== undefined ? action.payload : !state.startPlayer
         }
      default:
         return state
   }
}
