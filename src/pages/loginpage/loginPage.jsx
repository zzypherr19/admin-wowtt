import React from 'react'
import LoginForm from '../../components/accountbox/loginForm'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const { authenticated} = useAuth();
  return (
    <div>
        {authenticated  ?
        <Navigate to="/home"/> :
        <LoginForm/>        
        }
    </div>
  )
}

export default LoginPage