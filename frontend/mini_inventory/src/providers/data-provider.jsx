import React, { useContext } from 'react'
import { useState } from 'react';

import { createContext } from 'react';

export const DataContext = createContext(null)

export default function Data({ children }) {
    const [warehouses, setWarehouses] = useState(null);
    const [products, setProducts] = useState(null);
    const [warehouseProducts, setWarehouseProducts] = useState(null);
    return (
        <DataContext.Provider value={{ name: "hello" }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
