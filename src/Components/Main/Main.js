import React, {useEffect, useRef} from "react";
import {dynamicAdaptive} from "../../utils/adaptiveFunction";
import {Header} from "../Header/Header";
import Map from "../Map/Map";
import {ListEvents} from "../ListEvents/ListEvents";

export const Main = () => {

   const mapRef = useRef()

   useEffect(()=>{
      dynamicAdaptive()
   },[])

   return (
     <>
        <Header
          mapRef={mapRef}
        />
        <main className={'App__main'}>
           <Map
             mapRef={mapRef}
           />
           <ListEvents mapRef={mapRef}/>
        </main>

     </>
   );
};