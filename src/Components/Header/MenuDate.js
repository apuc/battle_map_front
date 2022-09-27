import React, {useState} from 'react';
import {currentDate} from "../../utils/Constants";
import {Calendar} from "../Calendar/Calendar";
import {useDispatch, useSelector} from "react-redux";
import {setEndDate, setStartDate} from "../../redux/Date/dataAction";
import {useNavigate, useParams} from "react-router-dom";
import {Modal} from "../Modal/Modal";
import {MapLegend} from "../MapLegend/MapLegend";
import {formatDate} from "../../utils/configData";

const MenuDate = ({setBurgerActive}) => {

   let params = useParams();
   const dispatch = useDispatch()
   const startDate = useSelector((state) => state.date.startDate)
   const endDate = useSelector((state) => state.date.endDate)
   const startDateParams =  params.date ? params.date.substring(0,10).toDate('dd.mm.yyyy', '.') : new Date()
   const [activeLegend, setActiveLegend] = useState(false)
   const [activeInfoModal, setActiveInfoModal] = useState(false)
   const navigate = useNavigate()

   const onChangeDatePeriod = (dates) => {
      const [start, end] = dates
      dispatch(setStartDate(start))
      dispatch(setEndDate(end))
      if (start && end) {
        let remainingParams = params.latitude ? params.latitude + '/' + params?.longitude + '/' + params?.scale : ''
        navigate("/"+formatDate(start) + '-' + formatDate(end) + '/' +remainingParams)
        setBurgerActive(false)
      }
   }

   const onChangeDateOnly = (dates) => {
      setBurgerActive(false)
      let remainingParams = params.latitude ? params.latitude + '/' + params?.longitude + '/' + params?.scale : ''
      if(formatDate(dates) !== params.date){
         navigate("/"+ formatDate(dates)+'/'+remainingParams)
      }
   }

   return (
     <>
        <ul className='menu-date' data-da='header__menu,first,767'>
           <li data-da={'header__container,1,767'} className={'menu-date__item menu-date__item_question'} onClick={() => setActiveInfoModal(true)}>
              <div className={'menu-date__icon-info'}>?</div>
           </li>
           <li data-da={'header__menu,1,768'} className={'menu-date__item menu-date__item_legend'} onClick={() => setActiveLegend(true)}>
              <div className={'menu-date__legend'}>
                 <img src="https://img.icons8.com/stickers/344/map-editing.png" alt="" />
              </div>
           </li>
           <li className='menu-date__item' onClick={() => onChangeDateOnly(new Date())} >
              <div className="menu-date__title">Сегодня:</div>
              <span>{formatDate(currentDate)}</span>
           </li>
           <li className='menu-date__item'>
              <Calendar
                startDate={startDateParams}
                onChange={onChangeDateOnly}
                selectsRange={false}
                title={'Выбранная дата:'}
              />
           </li>
           <li className='menu-date__item'>
              <Calendar
                startDate={startDate}
                endDate={endDate}
                onChange={onChangeDatePeriod}
                selectsRange={true}
                title={'Период:'}
              />
           </li>
        </ul>
        <Modal setActive={setActiveInfoModal} active={activeInfoModal} title={'Информация'}>
           <div className={'info'}>
              <p className={'info__text'}>Внимание!</p>
              <p className={'info__text'}>Администрация сайта не несет ответственности за точность, полноту или
                 качество предоставленной информации.</p>
              <p className={'info__text'}>По требованию Роскомнадзора ООО «Портал» приводит данные о деталях
                 военной операции на Украине на основании информаци и российских официальных источников.</p>
           </div>
        </Modal>
        <Modal setActive={setActiveLegend} active={activeLegend} title={'Легенда'}>
           <MapLegend />
        </Modal>
     </>
   );
};

export default React.memo(MenuDate);
