import Navbar from '../Components/navbar.jsx'
import '../styles/home.css';


function Home() {
    
    return (
        <div className='home-container'>
           <Navbar/>
           <div class="pixie" style={{ backgroundImage: "url('/img/task-graphic.png')"}}>
           <h1>Task Tidy</h1>
           <div class="sparkle"></div>
           </div>
        </div>
    );
};

export default Home;