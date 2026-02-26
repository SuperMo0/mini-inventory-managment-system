import { useState } from 'react'

export default function ProductForm({ onClose, onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    return (<>
        <h2>Create New Product</h2>
        <form className='form' action="#">
            <label htmlFor="product-name">Product Name*</label>
            <input type="text" id="product-name" name="product-name" required value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="product-description">Product Description*</label>
            <textarea id="product-description" name="product-description" rows="4" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </form>
        <div className="popup-actions-container">
            <button onClick={() => onSubmit({ title, description })}>Submit</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    </>
    )
}
