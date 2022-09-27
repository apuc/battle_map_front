export const filteredDataOnDate = (state) => {

   return state.geoJson.storeGeoJson
}

export const filteredDataOnPeriod = (state) => {

   return state.geoJson.storeGeoJsonForPeriod && state.geoJson.storeGeoJsonForPeriod.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
}

export const startPlayerSelector = (state) => {
   return state.geoJson.startPlayer
}

