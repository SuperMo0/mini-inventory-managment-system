import React from 'react'
import { Link } from 'react-router'
import '../styles/header.css'

export default function Header() {
    return (
        <header>
            <nav aria-label="Main navigation">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/warehouses">Warehouses</Link>
                </div>
            </nav>
        </header>
    )
}
