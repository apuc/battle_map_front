import React, {useEffect, useRef, useState} from 'react'
import './listEvents.scss'
import {useDispatch, useSelector} from 'react-redux'
import {
   _metaNewsSelector, currentPageSelector,
   idActiveNewsSelector,
   isFetchingSelector,
   newsSelector
} from '../../redux/News/newsSelectors'
import {getMoreNews, getNews, setFetching, setIdActiveNews} from '../../redux/News/newsAction'
import logo from '../../assets/images/Logo.jpg'
import {timeConverter} from "../../utils/configData";
import icon_back from '../../assets/images/icon_back.svg'
import {TelegramIcon, VKIcon, VKShareButton, TelegramShareButton} from "react-share";
import {useNavigate, useParams} from "react-router-dom";


export const ListEvents = ({mapRef}) => {

   const selectedNewsID = useSelector(idActiveNewsSelector)
   const news = useSelector(newsSelector)
   const metaNews = useSelector(_metaNewsSelector)
   const fetching = useSelector(isFetchingSelector)
   const zoom = 13
   const dispatch = useDispatch()
   const [isShowEvents, setIsShowEvents] = useState(true)
   const currentPage = useSelector(currentPageSelector)
   const navigate = useNavigate()

   let params = useParams();

   const showEvent = (id, date) => {
      if (id === selectedNewsID) return
      dispatch(setIdActiveNews(id))
      navigate('/' + timeConverter(date) + '/' + id)
   }

   useEffect(() => {
         dispatch(getMoreNews(currentPage,fetching, params.date))
   }, [fetching])

   useEffect(() => {
      dispatch(getNews(params.date))
   }, [params.date])

   useEffect(() => {
      if(params.id){
         dispatch(setIdActiveNews(+params.id))
      }
      let scrollList = document.querySelector('.list-events__container')
      scrollList.addEventListener('scroll', scrollHandler)
      return function () {
         scrollList.removeEventListener('scroll', scrollHandler)
      }
   }, [news])


   const scrollHandler = (e) => {
      if (e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 100 && news.length < metaNews.totalCount && currentPage <= metaNews.pageCount) {
         dispatch(setFetching(true))
      }
   }

   const hideNews = () => {
      setIsShowEvents(prev => !prev)
      const listEventsContainer = document.querySelector('.list-events__container')
      const listEvents = document.querySelector('.list-events')
      const headerEvents = document.querySelector('.list-events h3')
      isShowEvents ? listEventsContainer.style.opacity = '0' : listEventsContainer.style.opacity = '1'
      isShowEvents ? listEvents.style.pointerEvents = 'none' : listEvents.style.pointerEvents = 'all'
      isShowEvents ? listEvents.style.background = 'transparent' : listEvents.style.background = '#f9f9f9'
      isShowEvents ? headerEvents.style.opacity = '0' : headerEvents.style.opacity = '1'
   }

   const toggleEvent = (e) => {
      if (e.target.classList.contains('events-list__button-further')) {
         let card_text = e.target.closest('.events-list').querySelector('.events-list__text');
         let card_event = e.target.closest('.events-list');
         let button_text = e.target.closest('.events-list').querySelector('.events-list__button-further');
         card_text.hidden = !card_text.hidden;
         button_text.innerHTML = card_text.hidden ? 'Подробно' : 'Скрыть';
         card_event.scrollIntoView({block: "start", behavior: "smooth"})
      }
   }


   return (
     <div className='list-events'>
        {<button className={'list-events__hide'} onClick={hideNews}><img src={icon_back}alt=""/> Показать события</button>}
        {<h3>{!news.length ? 'Загрузка...' : 'Последние события:'}  <span onClick={hideNews}>&#10006;</span></h3>}
           <div className='list-events__container'>
              {
                 news.map((list) => (
                   <article
                     className={
                        list.id === selectedNewsID
                          ? 'events-list events-list_selected'
                          : 'events-list'
                     }
                     key={list.id}
                     id={list.id + ''}
                     onClick={() => showEvent(list.id, list.published_date)}
                   >
                      <div className='events-list__header'>
                         <div className='events-list__icon'>
                            <img src={list?.event?.icon ? 'https://front.dnr.one/' + list?.event?.icon : logo}
                                 alt={'icon'}/>
                         </div>
                         <div className='events-list__data'>{timeConverter(list.published_date, true)}</div>
                      </div>
                      <div className='events-list__body'>
                         <div className="events-list__title">{list.title}</div>
                         <div className="events-list__photo">
                            <img src={'https://front.dnr.one/' + list.photo} alt={list.photo}/>
                         </div>
                         {<div className='events-list__text' hidden={true}>{list.news_body}</div>}
                         {<div className="events-list__button-further" onClick={toggleEvent}>Подробно</div>}
                      </div>
                      <div className="events-list__share">
                         Поделиться:
                         <TelegramShareButton
                           url={'https://map.da-info.pro/' + timeConverter(list.published_date) + '/' + list.id}
                         >
                            <TelegramIcon size={25} round={true}/>
                         </TelegramShareButton>
                         <VKShareButton
                           url={'https://map.da-info.pro/' + timeConverter(list.published_date) + '/' + list.id}
                         >
                            <VKIcon size={25} round={true}/>
                         </VKShareButton>
                      </div>
                   </article>
                 ))}
              {
                 fetching && <h4>Подождите идет загрузка...</h4>
              }
           </div>
     </div>
   )
}
