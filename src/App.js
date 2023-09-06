import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css';
import Home from './compoment/Home';
import Description from './compoment/Description';
import Cart from './compoment/Cart';
import Register from './compoment/Register';
import Login from './compoment/Login';
function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>  
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/description/:id' element={<Description/>} />
      </Routes>
    </Router>

    </div>
 
  )
}

export default App