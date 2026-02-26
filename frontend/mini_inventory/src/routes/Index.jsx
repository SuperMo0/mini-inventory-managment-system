import ProductForm from '../components/ProductForm';
import WarehouseForm from '../components/WarehouseForm';
import './../styles/home.css'
import { useState } from 'react'
export default function Index() {

    const [createPopup, setCreatePopup] = useState(null);


    const handleCreateProduct = (productData) => {
        console.log('Create Product button clicked with data:', productData);
    };

    const handleCreateWarehouse = (warehouseData) => {

        console.log('Create Warehouse button clicked with data:', warehouseData);
    };

    return (
        <div className='index-main'>
            <h1 id='index-title'>Inventory Management System</h1>
            <div className="index-actions-container">
                <button id='create-product-button' className="index-create-button" onClick={() => { setCreatePopup("product") }}>Create Product</button>
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
            {createPopup === "product" && (
                <div className="popup-overlay">
                    <div className="popup">
                        <ProductForm onClose={() => setCreatePopup(null)} onSubmit={handleCreateProduct} />
                    </div>
                </div>
            )}
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
