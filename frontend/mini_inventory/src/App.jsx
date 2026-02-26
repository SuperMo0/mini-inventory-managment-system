import { useState } from 'react'
import { useData } from './providers/data-provider'
import { Route, Routes } from 'react-router'
import Index from './routes/Index'
import Products from './routes/products'
import Warehouses from './routes/warehouses'
import Header from './components/header'
function App() {
  const { name } = useData()
  return (<>
    <Header />
    <Routes>
      <Route path='/' element={Index}></Route>
      <Route path='/products' element={Products}></Route>
      <Route path='/warehouses' element={Warehouses}></Route>
    </Routes>



  </>)
}

export default App
