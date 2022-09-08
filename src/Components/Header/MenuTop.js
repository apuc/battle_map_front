import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {mapCenterDonbass, mapCenterUkraine, menuHeaderList} from "../../Constants";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const MenuTop = ({mapRef, setBurgerActive}) => {

   let params = useParams();

   let activeIndex = +params.latitude === mapCenterDonbass[0] && +params.longitude === mapCenterDonbass[1] ? 1 : 0

   const [activeMenuItem, setActiveMenuItem] = useState(activeIndex)


   const [activeSubMenuItem, setActiveSubMenuItem] = useState(null)
   const [listBattles, setListBattles] = useState(null)
   const [showSubMenu, setShowSubMenu] = useState(false)
   const selectedDate = useSelector((state) => state.date.selectedDate)

   const navigate = useNavigate()

   console.log(listBattles)

   const showMapCenter = (e) => {
      console.log("center")
      const index = e.target.dataset.index
      switch (index) {
         case '0':
            navigate('/'+selectedDate.toLocaleString('sv-SE').substring(0, 10)+'/'+mapCenterUkraine[0]+'/'+mapCenterUkraine[1]+'/'+6)
            mapRef.current.setView(mapCenterUkraine, 6)
            setActiveMenuItem(+e.target.dataset.index)
            break
         case '1':
           navigate('/'+ selectedDate.toLocaleString('sv-SE').substring(0, 10)+'/'+mapCenterDonbass[0]+'/'+mapCenterDonbass[1]+'/'+7)
            mapRef.current.setView(mapCenterDonbass, 7)
            setActiveMenuItem(+e.target.dataset.index)
            break
         default:
            return
      }
      setActiveSubMenuItem(null)
      setBurgerActive(false)
   }
   // const a = mapRef.current&& mapRef.current.getBounds()._northEast.lat
   // console.log(a)
  // const memoizedMapCenter= useCallback(() => showMapCenter, [a]);

   const toFocusEvent = (e, item) => {
     // navigate('/'+ selectedDate.toLocaleString('sv-SE').substring(0, 10)+'/'+mapCenterDonbass[0]+'/'+mapCenterDonbass[1]+'/'+7)
      console.log(item.bounds)
      const a = (JSON.parse(item.bounds)[0][0] + JSON.parse(item.bounds)[1][0]) / 2
      const b = (JSON.parse(item.bounds)[0][1] + JSON.parse(item.bounds)[1][1]) / 2
      item.bounds && mapRef.current.fitBounds(JSON.parse(item.bounds), {padding: [50, 50]})
      //mapRef.current.setView([a, b], 11)
      setActiveSubMenuItem(+e.target.dataset.index)

      setBurgerActive(false)
   }

   useEffect(async () => {
      try {
         const response = await axios.get(`${process.env.REACT_APP_API_URL}/bounds/get-bounds`)
         setListBattles(response.data.data)
      } catch (e) {
         setListBattles([{name: 'Данных нет', bounds: null},])
      }
      document.addEventListener('click', (e) => {
         const sub = document.querySelector('#sub-list-battles')
         const withinBoundaries = e.composedPath().includes(sub);
         if (!withinBoundaries) {
            setShowSubMenu(false)
         }
      })
   }, [])

   return (
     <ul className={'menu-top'} data-da='header__menu,0,992'>
        {menuHeaderList.map((item, index) => (
          <li
            key={item.id}
            data-index={index}
            className={
               index === activeMenuItem
                 ? 'menu-top__item menu-top__item_active'
                 : 'menu-top__item'
            }
            onClick={showMapCenter}
          >
             {item.title}
          </li>
        ))}

        <li
          className={'menu-top__item menu-top__item_battles'}
          id={'sub-list-battles'}
          onClick={() => setShowSubMenu(true)}
        >
           Места сражений
           {<ul style={{display: showSubMenu ? 'block' : 'none'}} className={'menu-top__sub-menu menu-sub'}>
              {listBattles && listBattles.map((item, index) => (
                <li
                  key={index}
                  data-index={index}
                  className={activeSubMenuItem === index ? 'menu-sub__item active' : 'menu-sub__item'}
                  onClick={(e) => toFocusEvent(e, item)}
                >
                   {item.name}
                </li>
              ))}
              <li
                className={'menu-sub__item'}
              >
                 Балаклея
              </li>
              <li
                className={'menu-sub__item'}
              >
                 Херсон
              </li>
           </ul>}
        </li>
     </ul>
   );
};

export default MenuTop;