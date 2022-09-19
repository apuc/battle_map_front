import React, {useEffect, useRef, useState} from 'react'
import './listEvents.scss'
import {useDispatch, useSelector} from 'react-redux'
import L from 'leaflet'
import {_metaNewsSelector, isFetchingSelector, isLoadingSelector, newsSelector} from '../../redux/News/newsSelectors'
import {getMoreNews, getNews, setFetching} from '../../redux/News/newsAction'
import logo from './../../Logo.jpg'
import {timeConverter, timeConverterUnix} from "../../utils/configData";
import icon_back from '../../icon-back-arrow-40.png'
import {TelegramIcon, VKIcon, VKShareButton, TelegramShareButton} from "react-share";
import {useNavigate, useParams} from "react-router-dom";
import {currentDate, formatDate, mapCenterUkraine} from "../../Constants";


export const ListEvents = ({mapRef}) => {

   const [selectedNewsID, setSelectedNewsID] = useState(null)
   const news = useSelector(newsSelector)
   const metaNews = useSelector(_metaNewsSelector)
   const fetching = useSelector(isFetchingSelector)
   const startDate = useSelector((state) => state.date.startDate)
   const endDate = useSelector((state) => state.date.endDate)
   const selectedDate = useSelector((state) => state.date.selectedDate)
   const zoom = 13
   const dispatch = useDispatch()
   const [newMarker, setNewMarker] = useState(null)
   const [isShowEvents, setIsShowEvents] = useState(true)
   const [currentPage, setCurrentPage] = useState(1)
   const navigate = useNavigate()

   let params = useParams();

   const shareUrl = "https://front.dnr.one/api/news/news?expand=tags,comments,photo,news_body,like&news_id=57"

   let LeafIcon = L.Icon.extend({
      options: {
         iconSize: [38, 38],
      }
   });

   const showEvent = (id, date, event, coordinates) => {
      if (coordinates) {
         if (id === selectedNewsID) return
         newMarker && newMarker.remove()
         setSelectedNewsID(id)
         const center = news.find((item) => item.id === id).coordinates.split(',')
         mapRef.current.setView(center, zoom)
         let icon = new LeafIcon({iconUrl: 'https://front.dnr.one/' + event?.icon})
         setNewMarker(L.marker(center, {icon: icon}).addTo(mapRef.current))
         navigate('/' + timeConverter(date) + '/' + center[0] + '/' + center[1] + '/' + zoom)
      } else {
         newMarker && newMarker.remove()
         setSelectedNewsID(id)
         mapRef.current.setView(mapCenterUkraine, 6)
         navigate('/' + timeConverter(date) + '/' + mapCenterUkraine[0] + '/' + mapCenterUkraine[1] + '/' + 6)
      }
   }

   useEffect(() => {
      dispatch(getNews(currentPage, fetching, params.date))
      setCurrentPage(prev => prev + 1)
   }, [fetching])

   useEffect(() => {
      dispatch(getMoreNews(currentPage, params.date))
   }, [params.date])

   useEffect(() => {
      let scrollList = document.querySelector('.list-events__container')
      scrollList.addEventListener('scroll', scrollHandler)
      return function () {
         scrollList.removeEventListener('scroll', scrollHandler)
      }
   }, [news])


   const scrollHandler = (e) => {
      if (e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 100 && news.length < metaNews.totalCount) {
         dispatch(setFetching(true))
      }
   }

   const hideNews = () => {
      setIsShowEvents(prev => !prev)
      const listEvents = document.querySelector('.list-events')
      const backArrow = document.querySelector('.list-events__hide')
      isShowEvents ? listEvents.style.transform = 'translateX(100%)' : listEvents.style.transform = 'translateX(0px)'
      isShowEvents ? backArrow.style.transform = 'translateX(-50%) rotateY(0)' : backArrow.style.transform = 'translateX(0px) rotateY(180deg)'
   }

   const toggleEvent = (e) => {
      if (e.target.classList.contains('events-list__button-further')) {
         let card_text = e.target.closest('.events-list').querySelector('.events-list__text');
         let button_text = e.target.closest('.events-list').querySelector('.events-list__button-further');
         card_text.hidden = !card_text.hidden;
         button_text.innerHTML = card_text.hidden ? 'Развернуть' : 'Скрыть';
      }
   }


   return (
     <div className='list-events'>
        <img className={'list-events__hide'} src={icon_back} alt="back"
             onClick={hideNews}/>
        {
           <div className='list-events__container'>
              <h3>{!news.length ? 'Событий за этот период нет!' : 'Последние события:'}</h3>
              {
                 news.map((list) => (
                   <article
                     className={
                        list.id === selectedNewsID
                          ? 'events-list events-list_selected'
                          : 'events-list'
                     }
                     key={list.id}
                     onClick={() => showEvent(list.id, list.published_date, list.event, list.coordinates)}
                   >
                      <div className='events-list__header'>
                         <div className='events-list__icon'>
                            <img src={list?.event?.icon ? 'https://front.dnr.one/' + list?.event?.icon : logo}
                                 alt={'icon'}/>
                         </div>
                         <div className='events-list__data'>{timeConverter(list.published_date)}</div>
                      </div>
                      <div className='events-list__body'>
                         <div className="events-list__title">{list.title}</div>
                         <div className="events-list__photo">
                            <img src={'https://front.dnr.one/' + list.photo} alt={list.photo}/>
                         </div>
                         {<div className='events-list__text' hidden={true}>{list.news_body}</div>}
                         {<div className="events-list__button-further" onClick={toggleEvent}>Развернуть</div>}
                      </div>
                      <div className="events-list__share">
                         Поделиться:
                         <TelegramShareButton url={shareUrl}>
                            <TelegramIcon size={25} round={true}/>
                         </TelegramShareButton>
                         <VKShareButton url={shareUrl}>
                            <VKIcon size={25} round={true}/>
                         </VKShareButton>
                      </div>
                   </article>
                 ))}
              {
                 fetching && <h4>Подождите идет загрузка...</h4>
              }
           </div>
        }
     </div>
   )
}
