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
              <Route path=":date/:latitude/:longitude/:scale/" element={<Main/>}/>
              <Route path=":date" element={<Main/>}/>
              <Route path="" element={<Main/>}/>
           </Route>
        </Routes>
     </div>
   )
}


const Main = () => {
   const [startPlayer, setStartPlayer] = useState(false)
   const [activeModal, setActiveModal] = useState(false)

   const mapRef = useRef()

   return (
     <>
        <Header
          startPlayer={startPlayer}
          mapRef={mapRef}
          setActiveModal={setActiveModal}
          activeModal={activeModal}
        />
        <main className={'App__main'}>
           <Map
             startPlayer={startPlayer}
             setStartPlayer={setStartPlayer}
             mapRef={mapRef}
           />
           <ListEvents mapRef={mapRef}/>
        </main>

     </>
   );
};

export default App;

