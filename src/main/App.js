import React from 'react';
import Rotas from './rotas';
import Navbar from '../components/navbar';

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'




function App(){ 
  return(
    <>
      <Navbar />
        <div className='container'>
          <Rotas />
        </div>
    </>
  )
}
export default App
