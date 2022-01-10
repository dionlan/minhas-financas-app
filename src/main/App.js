import React from 'react';
import Rotas from './rotas';
import Navbar from '../components/navbar'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/minty/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

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
