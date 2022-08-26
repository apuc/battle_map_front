import axios from 'axios'
import { SET_NEWS } from './newsConstants'
import {optionsDate} from "../../Constants";
import {timeConverter, timeConverterUnix} from "../../utils/configData";

const setNews = (news) => ({
  type: SET_NEWS,
  payload: news
})


export const getNews = (dateFrom,dateTo) => async (dispatch) => {
  try {
    if(!dateTo) dateTo = timeConverterUnix(new Date())
    if(!dateFrom) dateFrom = timeConverterUnix(new Date().setDate(new Date().getDate() - 7))


    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/news/get-events?dateFrom=${dateFrom}&dateTo=${dateTo}`
    )

    dispatch(setNews(response.data))

  } catch (e) {
    console.log(e)
  }
}

