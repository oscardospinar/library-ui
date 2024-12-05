import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { NavBar } from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import { NavBarEstudiantes } from './components/NavBarEstudiantes/NavBarEstudiantes';
import EmailValidation from './components/Responsable/Responsable';
import FormularioRegistro from './components/Registro/Registro';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Rutas principales */}
          <Route index element={<Login />} /> {/* Página inicial */}
          <Route path="/navar" element={<NavBar />} /> {/* Redirigirá al componente NavBar */}
          <Route path="/navar2" element={<NavBarEstudiantes />} /> {/* Redirigirá al componente NavBar */}
          <Route path='/Responsable' element={<EmailValidation />} /> {}
          <Route path='/Registro' element={<FormularioRegistro />} /> {}
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
