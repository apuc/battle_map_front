import React, {useState} from 'react'
import logo from '../../assets/images/Logo.jpg'
import './header.scss'
import MenuTop from "./MenuTop";
import MenuDate from "./MenuDate";

export const Header = ({mapRef}) => {

   const [burgerActive, setBurgerActive] = useState(false)

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
              </nav>
           </div>
        </div>
     </header>
   )
}
