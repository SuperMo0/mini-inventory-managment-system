import { useState } from 'react'
import { useData } from './providers/data-provider'
import { Route, Routes } from 'react-router'
import Index from './routes/home'
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
        <Route path='/warehouses'>
          <Route index element={<Warehouses />} />
          <Route path=':whTitle' element={<Warehouse />}></Route>
        </Route>

      </Routes>
    </main>
  </>)
}

export default App
