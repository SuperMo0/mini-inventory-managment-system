import React, { useEffect } from 'react'
import { useData } from '../providers/data-provider';
import '../styles/products.css'
import { createProduct } from '../utils/api';
import ProductForm from '../components/ProductForm';
import { useState } from 'react';

export default function Products() {


    const [createPopup, setCreatePopup] = useState(null);

    const { products, fetchProducts, setProducts } = useData();

    useEffect(() => {
        fetchProducts();
    }, [])

    if (!products) {
        return <div className="products-main">Loading products...</div>;
    }

    const handleCreateProduct = async (productData) => {
        try {
            // to improve: we can use optimistic here with fake id and then swap with the real one 
            const response = await createProduct(productData);
            const newProduct = response.product;
            setProducts([...products, newProduct]);
            setCreatePopup(null);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="products-main">
            <div className='products-header'>
                <h1>Products</h1>
                <button id='create-product-button' className="index-create-button" onClick={() => { setCreatePopup("product") }}>Create Product</button>
            </div>
            <div className="grid-container">
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
            {createPopup === "product" && (
                <div className="popup-overlay">
                    <div className="popup">
                        <ProductForm onClose={() => setCreatePopup(null)} onSubmit={handleCreateProduct} />
                    </div>
                </div>
            )}

        </div>
    )
}
