import { useState } from 'react'

export default function WarehouseForm({ onClose, onSubmit }) {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title || !location || !description) {
            alert("Please fill in all required fields.");
            return;
        }
        const warehouseData = { title, location, description };
        try {
            await onSubmit(warehouseData);
        } catch (error) {
            alert('Please make sure warehouse title is unique.');
        }

    }
    return (<>
        <h2>Create New Warehouse</h2>
        <form className='form' action="#">
            <label htmlFor="warehouse-name">Warehouse Name*</label>
            <input type="text" id="warehouse-name" name="warehouse-name" required value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="warehouse-location">Warehouse Location*</label>
            <input type="text" id="warehouse-location" name="warehouse-location" required value={location} onChange={(e) => setLocation(e.target.value)} />
            <label htmlFor="warehouse-description">Warehouse Description*</label>
            <textarea id="warehouse-description" name="warehouse-description" rows="4" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <div className="popup-actions-container">
                <button type='submit' onClick={handleSubmit}>Submit</button>
                <button type='button' onClick={onClose}>Cancel</button>
            </div>
        </form>

    </>
    )
}
