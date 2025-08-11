import { useState } from 'react';
import '../styles/navbar.css'

function Navbar() {
    const [isMobile, setIsMobile] = useState(false);

    return (
        <div className='navbar'>
            <div className="menu-icon" onClick={() => setIsMobile(!isMobile)}>
                {isMobile ? '✖' : '☰'}
            </div>
            <ul className={`navlinks ${isMobile ? 'navlinks-mobile' : ''}`}>
                <a href='/'>home</a>
                <a href='/signup'>signup</a>
                <a href='/login'>login</a>
            </ul>
        </div>
    )
}

export default Navbar;