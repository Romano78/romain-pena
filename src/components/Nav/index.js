'use client';

import React from 'react';
import style from './style.css';

const Nav = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`container nav__wrapper ${isOpen ? 'open' : ''}`} onClick={() => { toggleNav() }}>
            <div className="flex justify-between nav_content">
                <h1>Romain Pena Ruiz</h1>
                <button onClick={() => { toggleNav() }}>Close</button>
            </div>
        </nav>
    );
};


export default Nav;
