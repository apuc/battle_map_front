import React, {useEffect, useState} from 'react';
import {currentDate, optionsDate} from "../../Constants";
import {Calendar} from "../Calendar/Calendar";
import {useDispatch, useSelector} from "react-redux";
import {setEndDate, setSelectedDate, setStartDate} from "../../redux/Date/dataAction";
import {getDataGeoJson} from "../../redux/GeoJson/geoJsonAction";
import {Modal} from "../Modal/Modal";
import {useNavigate, useParams} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {Navigate} from "react-router";

const MenuDate = ({startPlayer, setActiveModal, setBurgerActive}) => {

   let params = useParams();
   const dispatch = useDispatch()
   const startDate = useSelector((state) => state.date.startDate)
   const endDate = useSelector((state) => state.date.endDate)
   const selectedDate = useSelector((state) => state.date.selectedDate)
   const navigate = useNavigate()

   const onChangeDatePeriod = (dates) => {
      const [start, end] = dates
      dispatch(setStartDate(start))
      dispatch(setEndDate(end))
      if (start && end) {
         console.log(start, end)
        // navigate("/"+start.toLocaleString('sv-SE').substring(0, 10)+'.'+ end.toLocaleString('sv-SE').substring(0, 10))
         dispatch(
           getDataGeoJson(
             start.toLocaleString('sv-SE').substring(0, 10),
             end.toLocaleString('sv-SE').substring(0, 10)
           )
         )
         setBurgerActive(false)
      }

   }

   useEffect(()=>{
      (function () {
         let originalPositions = [];
         let daElements = document.querySelectorAll('[data-da]');
         let daElementsArray = [];
         let daMatchMedia = [];
         //Заполняем массивы
         if (daElements.length > 0) {
            let number = 0;
            for (let index = 0; index < daElements.length; index++) {
               const daElement = daElements[index];
               const daMove = daElement.getAttribute('data-da');
               if (daMove != '') {
                  const daArray = daMove.split(',');
                  const daPlace = daArray[1] ? daArray[1].trim() : 'last';
                  const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
                  const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
                  const daDestination = document.querySelector('.' + daArray[0].trim())
                  if (daArray.length > 0 && daDestination) {
                     daElement.setAttribute('data-da-index', number);
                     //Заполняем массив первоначальных позиций
                     originalPositions[number] = {
                        "parent": daElement.parentNode,
                        "index": indexInParent(daElement)
                     };
                     //Заполняем массив элементов
                     daElementsArray[number] = {
                        "element": daElement,
                        "destination": document.querySelector('.' + daArray[0].trim()),
                        "place": daPlace,
                        "breakpoint": daBreakpoint,
                        "type": daType
                     }
                     number++;
                  }
               }
            }
            dynamicAdaptSort(daElementsArray);

            //Создаем события в точке брейкпоинта
            for (let index = 0; index < daElementsArray.length; index++) {
               const el = daElementsArray[index];
               const daBreakpoint = el.breakpoint;
               const daType = el.type;

               daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
               daMatchMedia[index].addListener(dynamicAdapt);
            }
         }
         //Основная функция
         function dynamicAdapt(e) {
            for (let index = 0; index < daElementsArray.length; index++) {
               const el = daElementsArray[index];
               const daElement = el.element;
               const daDestination = el.destination;
               const daPlace = el.place;
               const daBreakpoint = el.breakpoint;
               const daClassname = "_dynamic_adapt_" + daBreakpoint;

               if (daMatchMedia[index].matches) {
                  //Перебрасываем элементы
                  if (!daElement.classList.contains(daClassname)) {
                     let actualIndex = indexOfElements(daDestination)[daPlace];
                     if (daPlace === 'first') {
                        actualIndex = indexOfElements(daDestination)[0];
                     } else if (daPlace === 'last') {
                        actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
                     }
                     daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
                     daElement.classList.add(daClassname);
                  }
               } else {
                  //Возвращаем на место
                  if (daElement.classList.contains(daClassname)) {
                     dynamicAdaptBack(daElement);
                     daElement.classList.remove(daClassname);
                  }
               }
            }
            customAdapt();
         }

         //Вызов основной функции
         dynamicAdapt();

         //Функция возврата на место
         function dynamicAdaptBack(el) {
            const daIndex = el.getAttribute('data-da-index');
            const originalPlace = originalPositions[daIndex];
            const parentPlace = originalPlace['parent'];
            const indexPlace = originalPlace['index'];
            const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
            parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
         }
         //Функция получения индекса внутри родителя
         function indexInParent(el) {
            var children = Array.prototype.slice.call(el.parentNode.children);
            return children.indexOf(el);
         }
         //Функция получения массива индексов элементов внутри родителя
         function indexOfElements(parent, back) {
            const children = parent.children;
            const childrenArray = [];
            for (let i = 0; i < children.length; i++) {
               const childrenElement = children[i];
               if (back) {
                  childrenArray.push(i);
               } else {
                  //Исключая перенесенный элемент
                  if (childrenElement.getAttribute('data-da') == null) {
                     childrenArray.push(i);
                  }
               }
            }
            return childrenArray;
         }
         //Сортировка объекта
         function dynamicAdaptSort(arr) {
            arr.sort(function (a, b) {
               if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
            });
            arr.sort(function (a, b) {
               if (a.place > b.place) { return 1 } else { return -1 }
            });
         }
         //Дополнительные сценарии адаптации
         function customAdapt() {
            //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
         }
      }());
   },[])

   const onChangeDateOnly = (dates) => {
      dispatch(setSelectedDate(dates))
      setBurgerActive(false)
      let remainingParams = (params?.latitude + '/' + params?.longitude + '/' + params?.scale) || ''
      console.log(remainingParams ? 5 :4)
      navigate("/"+dates.toLocaleString('sv-SE').substring(0, 10))
   }

   useEffect(()=>{

   }, [params.date])

   return (
     <>
        <ul className='menu-date' data-da='header__menu,first,646'>
           <li data-da={'header__container,1,646'} className={'menu-date__item menu-date__item_question'} onClick={() => setActiveModal(true)}>
              <div className={'menu-date__icon-info'}>?</div>
           </li>
           <li className='menu-date__item' onClick={() => onChangeDateOnly(new Date())} >
              <div className="menu-date__title">Сегодня:</div>
              <span>{currentDate.toLocaleString('ru', optionsDate)}</span>
           </li>
           <li className='menu-date__item'>
              <Calendar
                startDate={selectedDate}
                onChange={onChangeDateOnly}
                selectsRange={false}
                startPlayer={startPlayer}
                title={'Выбранная дата:'}
              />
           </li>
           <li className='menu-date__item'>
              <Calendar
                startDate={startDate}
                endDate={endDate}
                onChange={onChangeDatePeriod}
                selectsRange={true}
                startPlayer={startPlayer}
                title={'Период:'}
              />
           </li>
        </ul>

     </>
   );
};

export default MenuDate;
