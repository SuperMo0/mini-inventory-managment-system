import React, { useEffect, useState } from 'react'
import WarehouseForm from '../components/warehouse-form';
import { useData } from '../providers/data-provider';
import { createWarehouse } from '../utils/api';
import '../styles/warehouses.css'
import { Link } from 'react-router';

export default function Warehouses() {

    const [createPopup, setCreatePopup] = useState(null);

    const { warehouses, fetchWarehouses, setWarehouses } = useData();

    useEffect(() => {
        fetchWarehouses();
    }, [])

    if (!warehouses) {
        return <div className="warehouses-main">Loading warehouses...</div>;
    }

    const handleCreateWarehouse = async (warehouseData) => {
        try {
            // to improve: we can use optimistic here with fake id and then swap with the real one 
            const response = await createWarehouse(warehouseData);
            console.log(response);
            const newWarehouse = response.warehouse;
            setWarehouses([...warehouses, newWarehouse]);
            setCreatePopup(null);
        } catch (error) {
            console.error('Error creating warehouse:', error);
        }
    };

    return (
        <div className="warehouses-main">
            <div className='warehouses-header'>
                <h1>Warehouses</h1>
                <button id='create-warehouse-button' className="index-create-button" onClick={() => { setCreatePopup("warehouse") }}>Create Warehouse</button>
            </div>

            <div className="grid-container">
                <div className="warehouses-grid">
                    {warehouses.map((warehouse) => (
                        <Link key={warehouse.id} to={`/warehouses/${warehouse.title}`} state={{ id: warehouse.id }} >
                            <div className='warehouse-card'>
                                <h2>{warehouse.title}</h2>
                                <p>{warehouse.description}</p>
                                <p>Location: {warehouse.location}</p>
                                <p>Total: {warehouse.total_items}</p>
                                <p>Unique: {warehouse.total_unique}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {createPopup === "warehouse" && (
                <div className="popup-overlay">
                    <div className="popup">
                        <WarehouseForm onClose={() => setCreatePopup(null)} onSubmit={handleCreateWarehouse} />
                    </div>
                </div>
            )}

        </div>
    )
}
