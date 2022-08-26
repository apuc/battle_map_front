import React, { useEffect, useState } from 'react'
import './listEvents.scss'
import { useDispatch, useSelector } from 'react-redux'
import L from 'leaflet'
import { newsSelector } from '../../redux/News/newsSelectors'
import { getNews } from '../../redux/News/newsAction'
import logo from './../../Logo.jpg'
import {optionsDate} from "../../Constants";
import {timeConverter, timeConverterUnix} from "../../utils/configData";

export const ListEvents = ({ mapRef }) => {
  const [selectedNewsID, setSelectedNewsID] = useState(null)
  const news = useSelector(newsSelector)
  const startDate = useSelector((state) => state.date.startDate)
  const endDate = useSelector((state) => state.date.endDate)
  const selectedDate = useSelector((state) => state.date.selectedDate)
  const zoom = 17
  const dispatch = useDispatch()
  const [newMarker, setNewMarker] = useState(null)

  const showEvent = (id) => {
    if (id === selectedNewsID) return
    newMarker && newMarker.remove()
    setSelectedNewsID(id)
    const center = news.find((item) => item.id === id).coordinates.split(',')
    mapRef.current.setView(center, zoom)
    setNewMarker(L.marker(center).addTo(mapRef.current))
  }



  useEffect(() => {
    if(startDate && endDate) {
      dispatch(getNews(timeConverterUnix(startDate), timeConverterUnix(endDate)))
    }
    else if(startDate && !endDate) return
    else {
      dispatch(getNews(timeConverterUnix(selectedDate.setHours(0,0,0,0)), timeConverterUnix(selectedDate)))
    }

  }, [endDate,selectedDate])

  return (
    <div className='list-events' data-da={'header__menu,last,44'}>
      <h3>Последние события:</h3>
      <div className='list-events__container'>
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
                  <img src={list.photo && logo} alt={list.id} />
                </div>
                <div className='events-list__data'>{timeConverter(list.event_time)}</div>
              </div>
              <div className='events-list__body'>
                <div className='events-list__text'>{list.title}</div>
              </div>
            </article>
          ))}
      </div>
    </div>
  )
}
