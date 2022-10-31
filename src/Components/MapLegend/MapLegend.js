import React, {useEffect, useState} from 'react';
import './mapLegend.scss'
import axios from "axios";

export const MapLegend = () => {

   const [iconsLegend, setIconsLegend] = useState([])

   useEffect(async ()=>{
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}event-type/get-event-types`)
      setIconsLegend(response.data.data)
   }, [])

   return (
     <div className={'legend'}>
        <div className="legend__control">
           <div className="legend__title">Зоны контроля</div>
           <div className="legend__row">
              <div className="legend__color legend__color_red" />
              <div className="legend__none">Освобожденные территории</div>
           </div>
           <div className="legend__row">
              <div className="legend__color legend__color_blue" />
              <div className="legend__none">Захваченные территории</div>
           </div>
           <div className="legend__row">
              <div className="legend__color legend__color_grey" />
              <div className="legend__none">Спорные территории</div>
           </div>
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
