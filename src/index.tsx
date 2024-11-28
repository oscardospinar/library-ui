import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login/Login';
import { NavBar } from './components/NavBar/NavBar';


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
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
