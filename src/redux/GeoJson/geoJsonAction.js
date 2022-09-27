import {SET_GEO_JSON, SET_START_PLAYER, ZEROING_GEO_JSON_FOR_PERIOD} from './geoJsonConsts'
import axios from "axios";

export const setGeoJson = (geoJsonData) => ({
  type: SET_GEO_JSON,
  payload: { geoJsonData }
})

export const zeroingDataPeriodGeoJson = () => ({type: ZEROING_GEO_JSON_FOR_PERIOD})
export const setStartPlayer = (flag) => ({type: SET_START_PLAYER, payload: flag})

export const getDataGeoJson = (date) => async (dispatch) => {

  const endDate = date.substring(11,21)
  const startDate = date.substring(0,10)

  try {
    if(endDate){
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/map/get-data/?startDate=${startDate}&date=${endDate}`)
      if(!response.data.hasErrors){
        dispatch(setGeoJson(response.data.data))
      }else {
        dispatch(setGeoJson({json_data: null}))
        alert("Данных за этот период нет!")
      }
    }else {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/map/get-data/?date=${startDate}`)
      dispatch(setGeoJson(response.data.data))
      dispatch(zeroingDataPeriodGeoJson())
    }
  }catch (e) {
    dispatch(setGeoJson({json_data: null}))
  }
}
