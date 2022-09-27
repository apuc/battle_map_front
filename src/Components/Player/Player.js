import React, { useEffect, useState } from 'react'
import './player.scss'
import { useDispatch, useSelector } from 'react-redux'
import {getDataGeoJson, setGeoJson, setStartPlayer} from '../../redux/GeoJson/geoJsonAction'
import {filteredDataOnPeriod, startPlayerSelector} from '../../redux/GeoJson/geoJsonSelectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCoffee,
  faBackwardStep,
  faForwardStep,
  faPlay,
  faPause,
  faBackward,
  faForward
} from '@fortawesome/free-solid-svg-icons'
import { optionsDate } from '../../Constants'

export const Player = () => {
  const dispatch = useDispatch()
  const geojsonData = useSelector(filteredDataOnPeriod)
  const startPlayer = useSelector(startPlayerSelector)
  const [progressValue, setProgressValue] = useState(0)

  const stepPlayer = geojsonData
    ? + Math.floor( (100 / (geojsonData.length - 1)) * 100 ) / 100
    : 0

  const changeProgressBar = (e) => {
    const value = +e.target.value
    if (value > 100 - stepPlayer) {
      dispatch(setGeoJson(geojsonData[geojsonData.length - 1]))
    } else {
      dispatch(setGeoJson(geojsonData[Math.ceil(+e.target.value / stepPlayer)]))
    }
    setProgressValue(+e.target.value)
  }

  const onStart = () => dispatch(setStartPlayer())

  const jumpEnd = () => {
    setProgressValue(100)
    dispatch(setGeoJson(geojsonData[geojsonData.length - 1]))
  }

  const jumpStart = () => {
    setProgressValue(0)
    dispatch(setGeoJson(geojsonData[0]))
  }

  useEffect(() => {
    if (Math.ceil(progressValue) >=100) {
      dispatch(setStartPlayer(false))
      return
    }

    if (startPlayer) {
      const timer = setTimeout(() => {
        const index = Math.ceil(progressValue / stepPlayer + 1)
        setProgressValue((prev) => prev + stepPlayer)
        dispatch(setGeoJson(geojsonData[index]))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [progressValue, startPlayer])

  useEffect(() => {
    setProgressValue(0)
  }, [geojsonData])

  // скрываем плеер, если нет данных или даннные за 1 день
  if (!geojsonData || geojsonData.length === 1) {
    return null
  }
  console.log(startPlayer)
  return (
    <div className={'player'}>
      <div className='player__container'>
        <div className='player__control'>
          <button
            disabled={!geojsonData}
            className={'player__button'}
            onClick={() => jumpStart()}
          >
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          <button
            disabled={!geojsonData}
            className={'player__button'}
            onClick={onStart}
          >
            {startPlayer && progressValue < 100 ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <button
            disabled={!geojsonData}
            className={'player__button'}
            onClick={() => jumpEnd()}
          >
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>
        <div className={'player__strip'}>
          <input
            disabled={!geojsonData}
            className={'player__progress progress'}
            type={'range'}
            step={stepPlayer}
            min={0}
            max={100}
            value={progressValue}
            onChange={changeProgressBar}
            style={{ backgroundImage: `linear-gradient( to right, #F2994A, 
                        #F4C319 ${100*+progressValue/100}%, 
                        #474747 ${100*+progressValue/100}%)`}}
          />
          {geojsonData &&
            geojsonData.map((item, index) => (
              <div
                className={'player__hint hint'}
                key={index}
                style={{ left: index * stepPlayer + '%' }}
              >
                {<p>{new Date(item.date).toLocaleDateString().substring(0, 5)}</p>}
                <div className={'hint__line'} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
