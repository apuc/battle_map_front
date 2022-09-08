import React, {useEffect, useState} from 'react'
import './listEvents.scss'
import {useDispatch, useSelector} from 'react-redux'
import L from 'leaflet'
import {newsSelector} from '../../redux/News/newsSelectors'
import {getNews} from '../../redux/News/newsAction'
import logo from './../../Logo.jpg'
import {optionsDate} from "../../Constants";
import {timeConverter, timeConverterUnix} from "../../utils/configData";
import icon_back from '../../icon-back-arrow-40.png'

export const ListEvents = ({mapRef}) => {
   const [selectedNewsID, setSelectedNewsID] = useState(null)
   const news = useSelector(newsSelector)
   const startDate = useSelector((state) => state.date.startDate)
   const endDate = useSelector((state) => state.date.endDate)
   const selectedDate = useSelector((state) => state.date.selectedDate)
   const zoom = 17
   const dispatch = useDispatch()
   const [newMarker, setNewMarker] = useState(null)
   const [isShowEvents, setIsShowEvents] = useState(true)

   const showEvent = (id) => {
      if (id === selectedNewsID) return
      newMarker && newMarker.remove()
      setSelectedNewsID(id)
      const center = news.find((item) => item.id === id).coordinates.split(',')
      mapRef.current.setView(center, zoom)
      setNewMarker(L.marker(center).addTo(mapRef.current))
   }


   useEffect(() => {
      if (startDate && endDate) {
         dispatch(getNews(timeConverterUnix(startDate), timeConverterUnix(endDate)))
      } else if (startDate && !endDate) return
      else {
         dispatch(getNews(timeConverterUnix(selectedDate.setHours(0, 0, 0, 0)), timeConverterUnix(selectedDate)))
      }

   }, [endDate, selectedDate])

   const sd = () => {
      setIsShowEvents(prev => !prev)
      const listEvents = document.querySelector('.list-events')
      const backArrow = document.querySelector('.list-events__hide')
      isShowEvents ? listEvents.style.transform = 'translateX(100%)' : listEvents.style.transform = 'translateX(0px)'
      isShowEvents ? backArrow.style.transform = 'translateX(-50%) rotateY(0)' : backArrow.style.transform = 'translateX(0px) rotateY(180deg)'

   }

   return (
     <div className='list-events'>
        <img className={'list-events__hide'} src={icon_back} alt="back"
             onClick={sd}/>
        {
           <div className='list-events__container'>
              <h3>Последние события:</h3>
              {
                 news.map((list) => (
                   <article
                     className={
                        list.id === selectedNewsID
                          ? 'list-events events-list events-list_selected'
                          : 'list-events events-list'
                     }
                     key={list.id}
                     onClick={() => showEvent(list.id)}
                   >
                      <div className='events-list__header'>
                         <div className='events-list__icon'>
                            <img src={list.photo && logo} alt={list.id}/>
                         </div>
                         <div className='events-list__data'>{timeConverter(list.event_time)}</div>
                      </div>
                      <div className='events-list__body'>
                         <div className='events-list__text'>{list.title}</div>
                      </div>
                   </article>
                 ))}


              <article className={'list-events events-list'}>
                 <div className='events-list__header'>
                    <div className='events-list__icon'>
                       <img src={logo} alt={'id'}/>
                    </div>
                    <div className='events-list__data'>25.05.2022</div>
                 </div>
                 <div className='events-list__body'>
                    <div className='events-list__text'>
                       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam id ipsa nam quibusdam tempore.
                    </div>
                 </div>
              </article>
              <article className={'list-events events-list'}>
                 <div className='events-list__header'>
                    <div className='events-list__icon'>
                       <img src={logo} alt={'id'}/>
                    </div>
                    <div className='events-list__data'>20.05.2022</div>
                 </div>
                 <div className='events-list__body'>
                    <div className='events-list__text'>
                       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam id ipsa nam quibusdam tempore.
                    </div>
                 </div>
              </article>


           </div>
        }
     </div>
   )
}
