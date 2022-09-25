import axios from 'axios'
import {SET_CURRENT_PAGE, SET_ID_ACTIVE_NEWS, SET_NEWS, SUPPLEMENT_NEWS, TOGGLE_IS__FETCHING} from './newsConstants'
import {timeConverterUnix} from "../../utils/configData";

const setNews = (news) => ({
   type: SET_NEWS,
   payload: news
})
const supplementNews = (news) => ({
   type: SUPPLEMENT_NEWS,
   payload: news
})
export const setIdActiveNews = (id) => ({
   type: SET_ID_ACTIVE_NEWS,
   payload: id
})
export const setCurrentPage = () => ({
   type: SET_CURRENT_PAGE
})

export const setFetching = (value) => ({type: TOGGLE_IS__FETCHING, payload: value})

export const getMoreNews = (page, fetching,date) => async (dispatch) => {

   const dateFrom = date && timeConverterUnix(date.substring(0, 10))
   const dateTo = date && timeConverterUnix(date.substring(11, 21))

   let path = `${process.env.REACT_APP_BASE_URL}news/filter?expand=category,tags,comments_count,photo,news_body,like&page=${page+1}`

   try {
      if (date) {
         switch (date.length) {
            case 10:
               path += `&from_date=${dateFrom}&published=${(dateFrom+82800)+3599}`
               break
            case 21:
               path += `&from_date=${dateFrom}&published=${dateTo}`
               break
            default:
               path += ''
         }
      }

      if(fetching){
         console.log(path)
         const response = await axios.get(path)
         dispatch(setCurrentPage())
         dispatch(setNews(response.data))
      }

   } catch (e) {
      console.log(e)
   } finally {
      dispatch(setFetching(false))
   }
}


export const getNews = (date) => async (dispatch) => {

   const dateFrom = date && timeConverterUnix(date.substring(0, 10))
   const dateTo = date && timeConverterUnix(date.substring(11, 21))

   let path = `${process.env.REACT_APP_BASE_URL}news/filter?expand=category,tags,comments_count,photo,news_body,like&page=${1}`

   try {
      if (date) {
         switch (date.length) {
            case 10:
               path += `&from_date=${dateFrom}&published=${(dateFrom+82800)+3599}`
               break
            case 21:
               path += `&from_date=${dateFrom}&published=${dateTo}`
               break
            default:
               path += ''
         }
      }
      const response = await axios.get(path)
      console.log(path)
      dispatch(supplementNews(response.data))
   } catch (e) {
      console.log(e)
   }
}
