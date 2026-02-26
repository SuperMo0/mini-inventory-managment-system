import { useState } from 'react'

export default function WarehouseForm({ onClose, onSubmit }) {
    description, location, title
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    return (<>
        <h2>Create New Warehouse</h2>
        <form className='form' action="#">
            <label htmlFor="warehouse-name">Warehouse Name*</label>
            <input type="text" id="warehouse-name" name="warehouse-name" required value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="warehouse-location">Warehouse Location*</label>
            <input type="text" id="warehouse-location" name="warehouse-location" required value={location} onChange={(e) => setLocation(e.target.value)} />
            <label htmlFor="warehouse-description">Warehouse Description*</label>
            <textarea id="warehouse-description" name="warehouse-description" rows="4" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </form>
        <div className="popup-actions-container">
            <button onClick={() => onSubmit({ title, location, description })}>Submit</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    </>
    )
}
