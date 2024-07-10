import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Update from './Update'
import Read from './Read'
import Stats from './Stats'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/update/:id' element={<Update />}></Route>
        <Route path='/read/:id' element={<Read />}></Route>
        <Route path='/stats' element={<Stats />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App