import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import ParentComponent from './components/ParentComponent';
import Delete from './components/Delete';
import Update from './components/Update';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Hour from './components/Hour';
import Displayhour from './components/Displayhour';
import Test from './components/Test';

import './Style.css';

function App() {
  const handleLogout = () => {
    // Supprimer les données de session et rediriger vers la page de connexion
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    // Redirection vers la page de connexion
  };

  return (
    <BrowserRouter>
      <ul>
        <li className='raclure'><Link className='Test' to="/">Accueil</Link></li>
        <li className='raclure'><Link className='Test' to="/about">À propos</Link></li>
        <li className='raclure'><Link className='Test' to="/contact">Contact</Link></li>
        <li className='raclure'><Link className='Test' to="/ParentComponent">Component</Link></li>
        <li className='raclure'><Link className='Test' to="/Delete">Delete</Link></li>
        <li className='raclure'><Link className='Test' to="/Update">Update</Link></li>
        <li className='raclure'><Link className='Test' to="/CreateAccount">CreateAccount</Link></li>
        <li className='raclure'><Link className='Test' to="/Login">Login</Link></li>
        <li className='raclure'><Link className='Test' to="/Hour">Hour</Link></li>
        <li className='raclure'><Link className='Test' to="/Displayhour">Displayhour</Link></li>
        <li className='raclure'><Link className='Test' to="/Test">Message</Link></li>
        <li className='raclure'><Link className='Test' onClick={handleLogout} to="/Login">Déconnexion</Link></li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ParentComponent" element={<ParentComponent />} />
        <Route path="/Delete" element={<Delete />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Hour" element={<Hour />} />
        <Route path="/Displayhour" element={<Displayhour />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;