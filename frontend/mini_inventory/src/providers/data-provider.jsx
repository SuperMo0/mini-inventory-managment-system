import React, { useContext } from 'react'
import { useState } from 'react';

import { createContext } from 'react';
import { getProducts, getWarehouses, getWarehouseProducts } from '../utils/api';

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

    const fetchWarehouseProducts = async (warehouseId) => {
        try {
            const whProductsData = await getWarehouseProducts(warehouseId);
            let newWarehouseProducts = new Map(warehouseProducts);
            newWarehouseProducts.set(warehouseId, whProductsData);
            setWarehouseProducts(newWarehouseProducts);
        } catch (error) {
            console.error(`Error fetching products for warehouse ${warehouseId}:`, error);
        }
    };

    return (
        <DataContext.Provider value={{
            warehouses,
            products,
            warehouseProducts,
            fetchProducts,
            fetchWarehouses,
            fetchWarehouseProducts,
            setWarehouses,
            setProducts,
            setWarehouseProducts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext)
