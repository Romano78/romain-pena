'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Nav = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <AnimatePresence>
            <motion.nav
                initial={{ transform: "translate(-50%, -100%)", left: "50%", opacity: 0 }}
                animate={{ transform: "translate(-50%, 30%)", left: "50%", opacity: 1 }}
                exit={{ transform: "translate(-50%, -100%)", left: "50%", opacity: 0 }}
                transition={{ duration: .3 }}
                className={`container nav__wrapper ${isOpen ? 'open' : ''}`} onClick={() => { toggleNav() }}>
                <div className="flex justify-between nav_content gap-4 px-4">
                    <h1 className="py-2">RR</h1>
                    <ul className="nav-items flex gap-4">
                        <li className="nav-item py-2">
                            <a href="#">Hi</a>
                        </li>
                        <li className="nav-item py-2">
                            <a href="#">About</a>
                        </li>
                        <li className="nav-item py-2">
                            <a href="#">Work</a>
                        </li>
                    </ul>
                    <button className="py-2">X</button>
                </div>
            </motion.nav>
        </AnimatePresence >
    );
};


export default Nav;
