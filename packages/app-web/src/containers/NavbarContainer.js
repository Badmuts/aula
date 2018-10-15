import React from 'react';
import Navbar from '../components/Navbar';
import AuthService from '../services/AuthService';

export default (props) => <Navbar {...props} onLogout={() => AuthService.logout() } />
