import './../styles/home.css'

export default function Index() {
    return (
        <div className='index-main'>
            <h1 id='index-title'>Inventory Management System</h1>
            <div className="index-actions-container">
                <button id='create-product-button' className="index-create-button">Create Product</button>
                <button id='create-warehouse-button' className="index-create-button">Create Warehouse</button>
            </div>
            <div className="activity-logs">
                <h2>Recent Activity</h2>
                <div className="logs-container">
                    <div className="index-activity-container">
                        <p className='index-activity'>created product with title "Wireless Mouse" </p>
                        <p className='index-activity-time'>2024-01-15 14:30</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
