import axios from 'axios'
import { SET_NEWS } from './newsConstants'

const setNews = (news) => ({
  type: SET_NEWS,
  payload: news
})

export const getNews = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/news/get-events`
    )
    dispatch(setNews(response.data))
  } catch (e) {
    console.log(e)
  }
}
