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
import CreateCategory from './components/CreateCategory';
import CreateQuestion from './components/CreateQuestion';
import PassQuestion from './components/PassQuestion';

import { useEffect } from 'react';

import './Style.css';

function App() {
  const storedEmail = sessionStorage.getItem('email');
  const storedToken = sessionStorage.getItem('token');
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  console.log('Is authenticated:', isAuthenticated);
  console.log(storedEmail);
  console.log(storedToken);
  const handleLogout = () => {
    // Supprimer les données de session et rediriger vers la page de connexion
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAuthenticated');
    // Redirection vers la page de connexion
  };
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté en fonction de sessionStorage
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      // L'utilisateur est connecté, effectuez les actions nécessaires
    }
  }, []);
  return (
    <BrowserRouter>
      <ul>
        <li className='raclure'><Link className='Test' to="/">Accueil</Link></li>

        <li className='raclure'><Link className='Test' to="/contact">Contact</Link></li>
        <li className='raclure'><Link className='Test' to="/CreateAccount">CreateAccount</Link></li>
        <li className='raclure'><Link className='Test' to="/Login">Login</Link></li>
        <li className='raclure'><Link className='Test' to="/Hour">Hour</Link></li>
        <li className='raclure'><Link className='Test' to="/Displayhour">Displayhour</Link></li>
        {sessionStorage.getItem('isAuthenticated') === 'true' && (
          <>
            <li className='raclure'><Link className='Test' to="/CreateCategory">Créer une categorie </Link></li>
            <li className='raclure'><Link className='Test' to="/about">Voir les categories</Link></li>
            <li className='raclure'><Link className='Test' to="/CreateQuestion">Créer une question </Link></li>

            <li className='raclure'><Link className='Test' to="/Delete">Delete</Link></li>
            <li className='raclure'><Link className='Test' to="/Update">Update</Link></li>
            <li className='raclure'><Link className='Test' to="/Test">Message</Link></li>
            <li className='raclure'><Link className='Test' to="/PassQuestion">PassQuestion</Link></li>

            <li className='raclure'><Link className='Test' onClick={handleLogout} to="/Login">Déconnexion</Link></li>
          </>
        )}
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
        <Route path="/CreateCategory" element={<CreateCategory />} />
        <Route path="/CreateQuestion" element={<CreateQuestion />} />
        <Route path="/PassQuestion" element={<PassQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;