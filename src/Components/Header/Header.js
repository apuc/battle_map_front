import React, {useState} from 'react'
import logo from '../../assets/images/Logo.jpg'
import './header.scss'
import {Modal} from "../Modal/Modal";
import MenuTop from "./MenuTop";
import MenuDate from "./MenuDate";

export const Header = ({mapRef}) => {

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
              <MenuDate setBurgerActive={setBurgerActive}/>
              <nav className={burgerActive ? 'header__menu active' : 'header__menu'}>
                 <div data-da={'header__container,1,768'} className={'header__buttons-block'}>
                    <button className={'header__button'} onClick={openListEventsModal}>Последние события</button>
                 </div>
              </nav>
           </div>
           <Modal active={activeListEvents} setActive={setActiveListEvents} title={'Последние события'} margin={0}>
              <div className="list-events-mobile"></div>
           </Modal>
        </div>
     </header>
   )
}
