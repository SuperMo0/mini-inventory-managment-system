import { useState } from 'react'
import { useData } from './providers/data-provider'
import { Route, Routes } from 'react-router'
import Index from './routes/Index'
import Products from './routes/products'
import Warehouses from './routes/warehouses'
import Header from './components/header'
import Warehouse from './routes/warehouse'
function App() {
  const { name } = useData()
  return (<>
    <Header />
    <main className="main-content">
      <Routes>
        <Route path='/' element={<Index />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/warehouses' element={<Warehouses />}></Route>
        <Route path='/warehouses/:whTitle' element={<Warehouse />}></Route>
      </Routes>
    </main>
  </>)
}

export default App
