import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Outlet } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Button } from 'semantic-ui-react';

const App: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('id_token');

  const handleLogout = () => {
    localStorage.removeItem('id_token');
    navigate('/login');
  };

  return (
    <div>
      <Menu style={{ backgroundColor: '#e8d8d8' }} borderless>

      <div style={{ backgroundColor: '#d0f0c0', minHeight: '100vh', padding: '2em' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;