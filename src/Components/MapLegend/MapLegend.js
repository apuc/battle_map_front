import React from 'react';
import './mapLegend.scss'

export const MapLegend = () => {
   return (
     <div className={'legend'}>
        <div className="legend__color__control">
           <div className="legend__title">Зоны контроля</div>
           <div className="legend__row">
              <div className="legend__color legend__color_red" />
              <div className="legend__none">Освобожденные территории</div>
           </div>
           <div className="legend__row">
              <div className="legend__color legend__color_blue" />
              <div className="legend__none">Захваченные территории</div>
           </div>
        </div>
        <div className="legend__color__icons">
           <div className="legend__title">Иконки</div>
           <div className="legend__row">
              <div className="legend__icon">
                 <img src="" alt="icon"/>
              </div>
              <div className="legend__none">Захват</div>
           </div>
           <div className="legend__row">
              <div className="legend__icon">
                 <img src="" alt="icon"/>
              </div>
              <div className="legend__none">Стрелковый бой</div>
           </div>
           <div className="legend__row">
              <div className="legend__icon">
                 <img src="" alt="icon"/>
              </div>
              <div className="legend__none">Обстрел</div>
           </div>
        </div>

     </div>
   );
};
