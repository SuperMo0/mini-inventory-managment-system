import React, { useEffect } from 'react'
import { useData } from '../providers/data-provider';

export default function Products() {


    const { products, fetchProducts } = useData();

    let product = {
        title: "Product 1",
        description: "This is product 1",
        total: 100
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    if (!products) {
        return <div className="products-main">Loading products...</div>;
    }

    return (
        <div className="products-main">

            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Total: {product.total}</p>
                    </li>
                ))}
            </ul>

        </div>
    )
}
