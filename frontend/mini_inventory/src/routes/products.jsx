import React, { useEffect } from 'react'
import { useData } from '../providers/data-provider';
import '../styles/products.css'

export default function Products() {


    const { products, fetchProducts } = useData();

    useEffect(() => {
        fetchProducts();
    }, [])

    if (!products) {
        return <div className="products-main">Loading products...</div>;
    }

    return (
        <div className="products-main">
            <h1>Products</h1>
            <div className="prodcuts-grid">
                {products.map((product) => (
                    <div key={product.id} className='product-card'>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Total: {product.total}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
