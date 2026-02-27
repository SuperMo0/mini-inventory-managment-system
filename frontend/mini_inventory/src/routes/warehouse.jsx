import React, { use, useEffect } from 'react'
import { useLocation, useParams } from 'react-router';
import { useData } from '../providers/data-provider';

export default function Warehouse() {

    const warehouseTitle = useParams().whTitle;
    const { warehouseProducts, fetchWarehouseProducts } = useData()

    // I did this to keep the url beutiful without the id 
    // this will fail if user refreshes the page because the state will not be passed
    // so id will be undefined
    // we can use the unique warehouse title as a param for the api
    // or we can fetch the id from the title if the state doesn't exist.
    const warehouseId = useLocation().state?.id;

    useEffect(() => {
        if (!warehouseProducts || !warehouseProducts.get(warehouseId)) {
            fetchWarehouseProducts(warehouseId);
        }
    }, [warehouseId])

    return (
        <div>Warehouse Title: {warehouseTitle}, ID: {warehouseId}</div>
    )
}
