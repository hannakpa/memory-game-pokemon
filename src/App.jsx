import React,{ useState } from 'react';
import Memory from './components/Memory';
import './App.css'

function App() {
 return(
   <>
    <img src='/img/ash.png' alt="Ash Ketchum" className="img-ash"></img>
   <Memory />
   <img src='/img/ash-pikachu.png' alt="Ash y Pikachu" className="img-ash-pikachu"></img>
   </>
 )


}

export default App
