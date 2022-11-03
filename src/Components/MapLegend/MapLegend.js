import React, {useEffect, useState} from 'react';
import './mapLegend.scss'
import axios from "axios";

export const MapLegend = () => {

   const [iconsLegend, setIconsLegend] = useState([])
   const [territoryСolor, setTerritoryСolor] = useState([])

   useEffect(async ()=>{
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}event-type/get-event-types`)
      const responseColor = await axios.get(`${process.env.REACT_APP_API_URL}/color/get-colors`)
      setTerritoryСolor(responseColor.data.data)
      setIconsLegend(response.data.data)
   }, [])

   return (
     <div className={'legend'}>
        <div className="legend__control">
           <div className="legend__title">Зоны контроля</div>
           {territoryСolor?.map(item=>(
             item.name && item.name.length !== 0 && <div className="legend__row" key={item.id}>
                <div className="legend__color" style={{background: item.value}}/>
                <div className="legend__none">{item.name}</div>
             </div>
           ))}
        </div>
        <div className="legend__title">Иконки</div>
        <div className="legend__icons">
           {iconsLegend?.map(item=>(
             <div className="legend__row" key={item.id}>
                <div className="legend__icon">
                   <img src={`https://front.dnr.one/${item.icon}`} alt={"icon"+item.id}/>
                </div>
                <div className="legend__none">{item.title}</div>
             </div>
           ))}
        </div>
     </div>
   );
};
