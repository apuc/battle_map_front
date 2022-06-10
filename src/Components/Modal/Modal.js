import React from 'react';
import "./modal.scss"


export const Modal = ({active, setActive, children}) => {

   return (
     <div className={active ? "modal active" : "modal"} onClick={()=>setActive(false)}>
        <div className={active ? "modal__content active" : "modal__content"} onClick={e=>e.stopPropagation()}>
           <div className={'modal__head'}><span onClick={()=>setActive(false)}>X</span></div>
           {children}
        </div>
     </div>
   );
};