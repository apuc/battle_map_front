import React from 'react'
import {
   Routes,
   Route
} from "react-router-dom";
import {Main} from "./Components/Main/Main";

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

export default App;

