import axios from 'axios'
import {SET_NEWS, SUPPLEMENT_NEWS, TOGGLE_IS__FETCHING} from './newsConstants'
import {timeConverterUnix} from "../../utils/configData";

const setNews = (news) => ({
   type: SET_NEWS,
   payload: news
})
const supplementNews = (news) => ({
   type: SUPPLEMENT_NEWS,
   payload: news
})

export const setFetching = (value) => ({type: TOGGLE_IS__FETCHING, payload: value})

export const getMoreNews = (page, fetching,date) => async (dispatch) => {

   const dateFrom = date && timeConverterUnix(date.substring(0, 10))
   const dateTo = date && timeConverterUnix(date.substring(11, 21))

   let path = `${process.env.REACT_APP_BASE_URL}news/filter?expand=category,tags,comments_count,photo,news_body,like&page=${page}`

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
      if(fetching){
         dispatch(setNews(response.data))
      }

       //  dispatch(setFetching(false))
      //}else{
       //  debugger
       //  dispatch(supplementNews(response.data))


      //}

   } catch (e) {
      console.log(e)
   } finally {
      dispatch(setFetching(false))
   }
}


export const getNews = (page, date) => async (dispatch) => {

   const dateFrom = date && timeConverterUnix(date.substring(0, 10))
   const dateTo = date && timeConverterUnix(date.substring(11, 21))

   let path = `${process.env.REACT_APP_BASE_URL}news/filter?expand=category,tags,comments_count,photo,news_body,like&page=${page}`

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
      dispatch(supplementNews(response.data))
   } catch (e) {
      console.log(e)
   }
}
