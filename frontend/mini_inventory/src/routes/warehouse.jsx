import React, { use, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router';
import { useData } from '../providers/data-provider';
import '../styles/products.css'
import WarehouseProductForm from '../components/warehouse-product-form';
import { addProductToWarehouse, updateWarehouseProductQuantity, transferProductBetweenWarehouses } from '../utils/api';
import UpdateWarehouseProductForm from '../components/update-warehouse-product-form';

export default function Warehouse() {

    const warehouseTitle = useParams().whTitle;
    const { warehousesProducts, fetchWarehouseProducts, setWarehousesProducts } = useData()
    const [addPopup, setaddPopup] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(null);

    // I did this to keep the url beautiful without the id 
    // this will fail if user refreshes the page because the state will not be passed
    // so id will be undefined
    // we can use the unique warehouse title as a param for the api
    // or we can fetch the id from the title if the state doesn't exist.
    const warehouseId = useLocation().state?.id;

    useEffect(() => {
        if (!warehousesProducts || !warehousesProducts.get(warehouseId)) {
            fetchWarehouseProducts(warehouseId);
        }
    }, [warehouseId])

    async function handleCreateProduct(productData) {
        try {
            const warehouseProduct = await addProductToWarehouse(warehouseId, productData.productId, productData.quantity);
            setWarehousesProducts(prev => {
                const updated = new Map(prev);
                const current = updated.get(warehouseId) || [];
                updated.set(warehouseId, [...current, warehouseProduct]);
                return updated;
            });
            setaddPopup(false);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }

    // we can use immer here to reduce the ugliness of react 
    // we should definitely refactor this into two functions!
    async function handleUpdateProduct(data, actionType) {
        if (actionType === "update") {
            if (!data.quantity) {
                alert("Please enter a quantity.");
                return;
            }
            try {
                const warehouseProduct = await updateWarehouseProductQuantity(warehouseId, data);
                setWarehousesProducts(prev => {
                    const updated = new Map(prev);
                    const current = updated.get(warehouseId) || [];
                    const index = current.findIndex(p => p.product.id === data.id);
                    if (index !== -1) {
                        current[index] = { ...current[index], quantity: warehouseProduct.quantity };
                        updated.set(warehouseId, current);
                    }
                    return updated;
                });
                setUpdatePopup(null);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        }
        else if (actionType === "transfer") {
            if (!data.transferQuantity || !data.destinationWarehouse) {
                alert("Please enter a quantity and select a destination warehouse.");
                return;
            }
            try {
                const { sourceWhProduct, destinationWhProduct } = await transferProductBetweenWarehouses(warehouseId, data);
                setWarehousesProducts(prev => {
                    const updated = new Map(prev);
                    const current = updated.get(warehouseId) || [];
                    const index = current.findIndex(p => p.product.id === data.id);
                    if (index !== -1) {
                        current.splice(index, 1);
                        updated.set(warehouseId, current);
                    }
                    const destinationCurrent = updated.get(data.destinationWarehouse);
                    if (destinationCurrent) {
                        const destIndex = destinationCurrent.findIndex(p => p.product.id === data.id);
                        if (destIndex !== -1) {
                            destinationCurrent[destIndex] = { ...destinationCurrent[destIndex], quantity: destinationWhProduct.quantity };
                        } else {
                            destinationCurrent.push(destinationWhProduct);
                        }
                        updated.set(data.destinationWarehouse, destinationCurrent);
                    }
                    return updated;
                });
                setUpdatePopup(null);
            } catch (error) {
                console.error('Error transferring product:', error);
            }
        }
    }

    if (!warehousesProducts || !warehousesProducts.get(warehouseId)) {
        return <div>Loading...</div>
    }

    let warehouseProducts = warehousesProducts.get(warehouseId);

    return (
        <div className="products-main">
            <div className='products-header'>
                <h1>{warehouseTitle} / Products</h1>
                <button id='create-product-button' className="index-create-button" onClick={() => { setaddPopup(true) }}>Add Product</button>
            </div>
            <div className="grid-container">
                <div className="prodcuts-grid">
                    {warehouseProducts.map((e) => (
                        <div onClick={() => { setUpdatePopup({ ...e.product, quantity: e.quantity }) }} key={e.product.id} className='product-card'>
                            <h2>{e.product.title}</h2>
                            <p>{e.product.description}</p>
                            <p>Total: {e.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
            {addPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <WarehouseProductForm onClose={() => setaddPopup(false)} onSubmit={handleCreateProduct} existingProducts={warehouseProducts} />
                    </div>
                </div>
            )}
            {updatePopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <UpdateWarehouseProductForm onClose={() => setUpdatePopup(null)} onSubmit={handleUpdateProduct} product={updatePopup} />
                    </div>
                </div>
            )}

        </div>
    )
}
