import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/store'
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter} from "react-router-dom";

const queryClient = new QueryClient({
   defaultOptions: {
      refetchOnWindowFocus: false
   }
})

ReactDOM.render(
  <BrowserRouter>
     <Provider store={store}>
        <QueryClientProvider client={queryClient}>
           <App/>
        </QueryClientProvider>
     </Provider>
  </BrowserRouter>,

  document.getElementById('root')
)
