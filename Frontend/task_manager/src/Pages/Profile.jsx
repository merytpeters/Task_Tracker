import '../styles/profile.css'; 
import '../styles/logo.css';
import { FaSearch, FaBell } from "react-icons/fa";
import { MdDashboard, MdCalendarToday, MdAnalytics, MdSettings } from 'react-icons/md';
import { useState, useEffect } from 'react';
import AllProjects from '../Components/allprojects';
import Tasks from '../Components/task';
import { MdAdd, MdClose } from 'react-icons/md';

function Profile() {
    const [isMobile, setIsMobile] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [iconAnimation, setIconAnimation] = useState("");

    useEffect(() => {
        const handleResize = () => {
            const smallScreen = window.innerWidth <= 768;
            setIsMobile(smallScreen)
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handleAddClick = () => {
        const nextState = !showTaskForm;
        setIconAnimation(nextState ? "pop-in" : "pop-out");
        setShowTaskForm(nextState);
        setTimeout(() => setIconAnimation(""), 200);
    };

    return(
        <div className="page-container">
            <h1 className="logo">Task Tidy</h1>
            <div className="header">
                {isMobile ? (
                    <div className="mobile-icons">
                        <a href="/profile"><MdDashboard size={24} /></a>
                        <a href="/profile"><MdCalendarToday size={24} /></a>
                        <a href="/profile"><MdAnalytics size={24} /></a>
                        <a href="/profile"><MdSettings size={24} /></a>
                    </div>
                ) : (
                    <div className="nav-header">
                    <ul className="nav-links">
                        <li><a href="/profile">Dashboard</a></li>
                        <li><a href="/profile">Calendar</a></li>
                        <li><a href="/profile">Analytics</a></li>
                        <li><a href="/profile">Settings</a></li>
                    </ul>
                    </div>
                )}
            </div>
            <div className='header-line'></div>
            <div className='vertical-line'></div>
            <div className='sidebar-horizontal-line'>
                <div className='sidebar'>
                    <ul>
                        <li><a href='/profile'>Profile</a></li>
                        <li><a href='/profile'>Today</a></li>
                        <li><a href='/profile'>Upcoming</a></li>
                        <li><a href='/profile'>Completed</a></li>
                        <li><a href='/profile'>Projects</a></li>
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
            <div className='projects'>
                <AllProjects />
            </div>
            {/* Add Task Icon */}
            <div className={`add-task-icon ${iconAnimation}`} onClick={handleAddClick}>
                {showTaskForm ? (
                    <MdClose size={36} color="purple" />
                ) : (
                <MdAdd size={36} color="purple" />
                )}
            </div>

            {/* Conditionally Render Task Form */}
            {showTaskForm && (
                <div className="task-form-container">
                    <Tasks />
                </div>
            )}
        </div>
    );
};

export default Profile;