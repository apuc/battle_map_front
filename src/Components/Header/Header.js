import React, {useEffect, useState} from 'react'
import logo from './../../Logo.jpg'
import './header.scss'
import {Modal} from "../Modal/Modal";
import MenuTop from "./MenuTop";
import MenuDate from "./MenuDate";
import {ListEvents} from "../ListEvents/ListEvents";

export const Header = ({startPlayer, mapRef, setActiveModal, activeModal}) => {

   const [burgerActive, setBurgerActive] = useState(false)
   const [activeListEvents, setActiveListEvents] = useState(false)

   const openListEventsModal = () => {
      setActiveListEvents(true)
      setBurgerActive(false)
   }
   return (
     <header className="header">
        <div className="header__container">


              <div className="header__icon">
                 <div className="header__logo">
                    <img src={logo} alt="logo"/>
                 </div>
              </div>
           <div className="header__body">
              <div className={burgerActive ? 'header__burger active' : 'header__burger'}
                   onClick={() => setBurgerActive(prev => !prev)}>
                 <span/>
              </div>
              <MenuTop mapRef={mapRef} setBurgerActive={setBurgerActive}/>
              <MenuDate startPlayer={startPlayer} setActiveModal={setActiveModal} setBurgerActive={setBurgerActive}/>
              <nav className={burgerActive ? 'header__menu active' : 'header__menu'}>
                 <div className={'header__buttons-block'}>
                    <button className={'header__button'} onClick={()=>openListEventsModal()}>Последние события</button>
                 </div>

              </nav>
           </div>
           <Modal setActive={setActiveModal} active={activeModal} title={'Информация'}>
              <div className={'info'}>
                 <p className={'info__text'}>Внимание!</p>
                 <p className={'info__text'}>Администрация сайта не несет ответственности за точность, полноту или
                    качество предоставленной информации.</p>
                 <p className={'info__text'}>По требованию Роскомнадзора ООО «Портал» приводит данные о деталях
                    военной операции на Украине на основании информаци и российских официальных источников.</p>
              </div>
           </Modal>
           {<Modal active={activeListEvents} setActive={setActiveListEvents} title={'Последние события'} margin={0}>
              <div className="sdad"></div>
           </Modal>}

        </div>
     </header>
   )
}
