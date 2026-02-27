import React, { useEffect, useMemo, useState } from 'react'
import { useData } from '../providers/data-provider';
import './../styles/warehouse-product-add-form.css'
export default function WarehouseProductForm({ onClose, onSubmit, existingProducts }) {

    const { products, fetchProducts } = useData()
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (!products) {
            fetchProducts();
        }
    })

    let prodcutsToAdd = useMemo(() => {
        if (!products) {
            return;
        }
        return products.filter(p => {
            return !existingProducts.some(ep => ep.product.id === p.id)
        })
    }, [products, existingProducts])

    if (!products) {
        return <div>Loading...</div>
    }

    // native select for simplicity
    return (
        <div className="warehouse-product-form">
            <h2>Add Product to Warehouse</h2>
            <form>
                <label>Product:</label>
                <select value={selectedProduct || ""} onChange={(e) => setSelectedProduct(e.target.value)}>
                    <option value="">Select a product</option>
                    {prodcutsToAdd.map((product) => (
                        < option key={product.id} value={product.id} >
                            {product.title} - {product.description}
                        </option>
                    ))}
                </select>
                <label>Quantity:</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <button type="button" onClick={() => onSubmit({ productId: selectedProduct, quantity })}>Add</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div >
    )
}