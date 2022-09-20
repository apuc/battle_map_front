import React from 'react';
import "./modal.scss"


export const Modal = ({active, setActive, children, title, margin}) => {

   return (
     <div className={active ? "modal active" : "modal"} onClick={()=>setActive(false)}>
        <div className={active ? "modal__content active" : "modal__content"} onClick={e=>e.stopPropagation()} style={{margin:margin}}>
           <div className={'modal__head'}>
              {title && <h2 className={'modal__title'}>{title}</h2>}
              <span onClick={()=>setActive(false)}>&#10006;</span>
           </div>
           {children}
        </div>
     </div>
   );
};