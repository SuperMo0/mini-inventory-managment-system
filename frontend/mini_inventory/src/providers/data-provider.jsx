import React, { useContext } from 'react'
import { useState } from 'react';

import { createContext } from 'react';
import { getProducts, getWarehouses } from '../utils/api';

export const DataContext = createContext(null)

export default function Data({ children }) {

    // todo: add is loading states
    const [warehouses, setWarehouses] = useState(null);

    const [products, setProducts] = useState(null);

    const [warehouseProducts, setWarehouseProducts] = useState(null);

    const fetchProducts = async () => {
        try {
            const productsData = await getProducts();
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchWarehouses = async () => {
        try {
            const warehousesData = await getWarehouses();
            setWarehouses(warehousesData);
        } catch (error) {
            console.error("Error fetching warehouses:", error);
        }
    };

    return (
        <DataContext.Provider value={{
            warehouses,
            products,
            warehouseProducts,
            fetchProducts,
            fetchWarehouses,
            setWarehouses,
            setProducts,
            setWarehouseProducts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
