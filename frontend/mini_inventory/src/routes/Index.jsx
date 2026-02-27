import ProductForm from '../components/ProductForm';
import WarehouseForm from '../components/warehouse-form';
import { useData } from '../providers/data-provider';
import { createProduct } from '../utils/api';
import './../styles/home.css'
import { useState } from 'react'
export default function Index() {

    const [createPopup, setCreatePopup] = useState(null);

    const { products, warehouses, fetchProducts, fetchWarehouses, setProducts, setWarehouses } = useData();

    const handleCreateWarehouse = async (warehouseData) => {
        try {
            const response = await createWarehouse(warehouseData);
            console.log('Warehouse created:', response);
        } catch (error) {
            console.error('Error creating warehouse:', error);
        }
    };

    return (
        <div className='index-main'>
            <h1 id='index-title'>Inventory Management System</h1>
            <div className="index-actions-container">
                <button id='create-warehouse-button' className="index-create-button" onClick={() => { setCreatePopup("warehouse") }}>Create Warehouse</button>
            </div>
            <div className="activity-logs">
                <h2>Recent Activity</h2>
                <div className="logs-container">
                    <div className="index-activity-container">
                        <p className='index-activity'>created product with title "Wireless Mouse"</p>
                        <p className='index-activity-time'>2026-02-09 10:30 AM</p>
                    </div>
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
