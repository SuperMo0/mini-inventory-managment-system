import React, { useEffect, useState } from 'react'
import '../styles/update-warehouse-product-form.css'
import { useData } from '../providers/data-provider';

export default function UpdateWarehouseProductForm({ onClose, onSubmit, product }) {

    const [actionType, setActionType] = useState("choosing");

    const [destinationWarehouse, setDestinationWarehouse] = useState(null);

    const [transferQuantity, setTransferQuantity] = useState(0);

    const { warehouses, fetchWarehouses } = useData();

    const [quantity, setQuantity] = useState(product.quantity);


    useEffect(() => {
        if (actionType === "transfer" && !warehouses) {
            fetchWarehouses();
        }
    }, [actionType])

    return (
        <>
            {actionType === "transfer" && (
                <div className="warehouse-product-transfer-form" >
                    <label htmlFor="destinationWarehouse">Destination Warehouse:</label>
                    <select id="destinationWarehouse" name="destinationWarehouse" value={destinationWarehouse || ""} onChange={(e) => setDestinationWarehouse(e.target.value)} required>
                        <option value="">Select a warehouse</option>
                        {warehouses && warehouses.map(w => (
                            <option key={w.id} value={w.id}>{w.title}-{w.location}</option>
                        ))}
                    </select>
                    <label htmlFor="quantity">Quantity to Transfer:</label>
                    <input type="number" id="quantity" name="quantity" value={transferQuantity} onChange={(e) => setTransferQuantity(e.target.value)} required />
                    <button type="submit" onClick={(e) => { e.preventDefault(); onSubmit({ ...product, transferQuantity, destinationWarehouse }, "transfer"); setActionType("choosing"); }}>Transfer</button>
                    <button type='button' onClick={() => setActionType("choosing")}>Back</button>
                </div>
            )}

            {actionType === "update" && (
                < div className="warehouse-product-update-form" >
                    <h2>Update Product in Warehouse</h2>
                    <p>Product: {product.title}</p>
                    <p>Current Quantity: {product.quantity}</p>
                    <form>
                        <label htmlFor="quantity">New Quantity:</label>
                        <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                        <button type="submit" onClick={(e) => { e.preventDefault(); onSubmit({ ...product, quantity }, "update"); setActionType("choosing"); }}>Update</button>
                        <button type='button' onClick={() => setActionType("choosing")}>Back</button>
                    </form>
                </div >
            )
            }
            {actionType === "choosing" && (
                <div className="action-choice">
                    <h2>What do you want to do?</h2>
                    <div className="action-choices-container">
                        <button type='button' onClick={() => setActionType("update")}>Update Quantity</button>
                        <button type='button' onClick={() => setActionType("transfer")}>Transfer to Another Warehouse</button>
                        <button type='button' onClick={onClose}>Cancel</button>
                    </div>
                </div>
            )}

        </>
    )
}
