import '../styles/profile.css'; 
import '../styles/logo.css';
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

function Profile() {
    return(
        <div className="page-container">
            <h1 className="logo">Task Tidy</h1>
            <div className="header">
                <ul>
                    <li><a href='/'>Dashboard</a></li>
                    <li><a href='/'>Calendar</a></li>
                    <li><a href='/'> Analytics</a></li>
                    <li><a href='/'>Settings</a></li>
                </ul>
            </div>
            <div className='header-line'></div>
            <div className='vertical-line'></div>
            <div className='sidebar-horizontal-line'>
                <div className='sidebar'>
                    <ul>
                        <li><a href='/'>Profile</a></li>
                        <li><a href='/'>Today</a></li>
                        <li><a href='/'>Upcoming</a></li>
                        <li><a href='/'>Completed</a></li>
                        <li><a href='/'>Projects</a></li>
                    </ul>
                </div>
            </div>
            <div className='searchbar'>
                <div className='searchbar-input'>
                    <FaSearch size={15} className='search-icon' />
                    <input placeholder='Search'/> 
                   </div>
            </div>
            <div className='notification'>
                <FaBell size={15} />
            </div>  
        </div>
    );
};

export default Profile;