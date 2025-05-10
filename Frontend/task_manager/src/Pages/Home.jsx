import Navbar from '../Components/navbar.jsx'
import '../styles/home.css';


function Home() {
    
    return (
        <div className='page-container'>
           <Navbar/>
           <div className="pixie" style={{ backgroundImage: "url('/img/task-graphic.png')"}}>
           <h1>Task Tidy</h1>
           <div className="sparkle"></div>
           </div>
        </div>
    );
};

export default Home;