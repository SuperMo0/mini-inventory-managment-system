import React, { useContext } from 'react'
import { useState } from 'react';

import { createContext } from 'react';
import { getProducts, getWarehouses, getWarehouseProducts } from '../utils/api';

export const DataContext = createContext(null)

export default function Data({ children }) {

    // todo: add is loading states
    const [warehouses, setWarehouses] = useState(null);

    const [products, setProducts] = useState(null);

    const [warehousesProducts, setWarehousesProducts] = useState(null);

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

    const fetchWarehouseProducts = async (warehouseId) => {
        try {
            const whProductsData = await getWarehouseProducts(warehouseId);
            let newWarehousesProducts = new Map(warehousesProducts);
            newWarehousesProducts.set(warehouseId, whProductsData);
            setWarehousesProducts(newWarehousesProducts);
        } catch (error) {
            console.error(`Error fetching products for warehouse ${warehouseId}:`, error);
        }
    };

    return (
        <DataContext.Provider value={{
            warehouses,
            products,
            warehousesProducts,
            fetchProducts,
            fetchWarehouses,
            fetchWarehouseProducts,
            setWarehouses,
            setProducts,
            setWarehousesProducts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
