import React, {useRef, useState} from 'react'
import {Map} from './Components/Map'
import {ListEvents} from './Components/ListEvents/ListEvents'
import {Header} from './Components/Header/Header'
import {
   Routes,
   Route
} from "react-router-dom";

const App = () => {


   return (
     <div className={'App'}>
        <Routes>
           <Route path="">
              <Route path=":date/:id" element={<Main/>}/>
              <Route path=":date" element={<Main/>}/>
              <Route path="" element={<Main/>}/>
           </Route>
        </Routes>
     </div>
   )
}


const Main = () => {

   const mapRef = useRef()

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

export default App;

