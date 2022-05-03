import {SET_GEO_JSON} from './geoJsonConsts'

let initialState = {
  storeGeoJson: null,
  storeGeoJsonForPeriod: null
}

export const geoJsonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GEO_JSON:
       if(Array.isArray(action.payload.geoJsonData)){
          return {
             ...state,
             storeGeoJsonForPeriod: action.payload.geoJsonData,
             storeGeoJson: action.payload.geoJsonData.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))[0].json_data
          }
       }else if(!action.payload.geoJsonData){
          return {
             ...state,
             storeGeoJson: null,
             storeGeoJsonForPeriod: null
          }
       }
       else {
          return {
             ...state,
             storeGeoJson: action.payload.geoJsonData.json_data,
          }
       }
    default:
      return state
  }
}
