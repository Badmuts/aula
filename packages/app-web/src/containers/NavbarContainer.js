import React from 'react';
import Navbar from '../components/Navbar';
import AuthService from '../services/AuthService';

export default (props) => <Navbar {...props} onLogout={() => AuthService.logout()} user={{ avatarUrl: '//gravatar.com/avatar/8aa5cf1c09d31cf3ca0d31ae5a179d89' }} />
