import './App.css';
import { useState } from "react";
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import "bootstrap/dist/css/bootstrap.css";
import Sidebar1 from './Sidebar1';
import Home from './pages/Home';



function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='container-fluid bg-secondary min-vh-100' >
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <Sidebar1 />
        </div>
        <div className='col'>
          <Home />
        </div>
    
      </div>
    </div>

  );
}

export default App;
