import '../styles/navbar.css'

function Navbar() {
    return (
        <div className='navbar'>
            <ul className='navlinks'>
                <a href='/'>home</a>
                <a href='/signup'>signup</a>
                <a href='/login'>login</a>
            </ul>
        </div>
    )
}

export default Navbar;