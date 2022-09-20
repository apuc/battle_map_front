import React, {forwardRef, useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './calendar.scss'
import {useParams} from "react-router-dom";
import { ru } from "date-fns/locale";
export const Calendar = ({
                            onChange,
                            endDate,
                            startDate,
                            selectsRange,
                            startPlayer,
                            title
                         }) => {

   let params = useParams();

   const CustomInput = forwardRef(({value, onClick}, ref) => (
     <div className="calendar" onClick={onClick} ref={ref}>
        <div className="calendar__title">
           {title}
        </div>
        <div className='calendar__input'>
           {(value || (params?.date && params?.date.length > 10 ? params?.date.replace('-', ' - ') : 'Выберите период')) || 'Выберите период'}
        </div>
     </div>

   ))

   return (
     <div className={'calendar'}>
        <DatePicker
          dateFormat='dd.MM.yyyy'
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange={selectsRange}
          minDate={new Date('2/24/22')}
          maxDate={new Date()}
          disabled={startPlayer}
          locale={ru}
          customInput={<CustomInput/>}
        />
     </div>
   )
}
