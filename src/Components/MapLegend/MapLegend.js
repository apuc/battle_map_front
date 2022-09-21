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
                 <img src="https://front.dnr.one//uploads/news-image/icon/d4e267c58b9141a3198357923d8fdca5.png" alt="icon"/>
              </div>
              <div className="legend__none">Международное событие</div>
           </div>
           <div className="legend__row">
              <div className="legend__icon">
                 <img src="https://front.dnr.one//uploads/news-image/icon/59f4e717cced81c196a0c51d94377e7c.png" alt="icon"/>
              </div>
              <div className="legend__none">Поставка вооружений</div>
           </div>
           <div className="legend__row">
              <div className="legend__icon">
                 <img src="https://front.dnr.one//uploads/news-image/icon/07f3df888a067dbb88e214ddcedfe9e5.svg" alt="icon"/>
              </div>
              <div className="legend__none">Обстрел</div>
           </div>
        </div>

     </div>
   );
};
