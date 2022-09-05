import React, { forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './calendar.scss'
import {useParams} from "react-router-dom";

export const Calendar = ({
  onChange,
  endDate,
  startDate,
  selectsRange,
  startPlayer
}) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className='calendar-input' onClick={onClick} ref={ref}>
      {value || 'Выберите период'}
    </button>
  ))
  let params = useParams();
  console.log(new Date(params.date))

  return (
    <div className={'calendar'}>
      <DatePicker
        dateFormat='dd.MM.yyyy'
        selected={new Date(params.date) || startDate}
        onChange={onChange}
        startDate={new Date(params.date) || startDate}
        endDate={endDate}
        selectsRange={selectsRange}
        minDate={new Date('2/24/22')}
        maxDate={new Date()}
        disabled={startPlayer}
        customInput={<CustomInput />}
      />
    </div>
  )
}
