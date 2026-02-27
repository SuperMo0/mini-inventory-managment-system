import ProductForm from '../components/ProductForm';
import WarehouseForm from '../components/warehouse-form';
import { useData } from '../providers/data-provider';
import { createProduct } from '../utils/api';
import './../styles/home.css'
import { useEffect, useState } from 'react'
import { formatEvent } from '../utils/event';
export default function Index() {

    const { logs, fetchLogs } = useData();

    useEffect(() => {
        fetchLogs();
    }, [])


    if (!logs) {
        return <div>Loading...</div>
    }

    return (
        <div className='index-main'>
            <h1 id='index-title'>Inventory Management System</h1>
            <div className="activity-logs">
                <h2>Recent Stock Movments</h2>
                <div className="logs-container">
                    {logs.map((log, index) => (
                        <div key={index} className="index-activity-container">
                            <p>{formatEvent(log)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
