import { useContext, useEffect, useState } from 'react'

import './App.css'
import Routing from './Router.jsx'
import { DataContext } from './Components/DataProvider/DataProvider.jsx'
import { auth } from './utils/firebase.js'
import { Type } from './utils/action.type.js'

function App() {
const[{user},dispatch]=useContext(DataContext)
useEffect(() => {
 auth.onAuthStateChanged((authuser)=> {if(authuser) {
  console.log(authuser);
  dispatch({
    type:Type.SET_USER,
    user:authuser
  })
 }else{
  dispatch({
    type: Type.SET_USER,
    user: null,
  });

 }
}
)
 
}, []);

  return (
    <>
      <Routing/>  
    </>
  )
}

export default App
