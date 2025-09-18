import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Principal from './pages/Principal'

const isAuthenticated = () => {
  return !!localStorage.getItem('authUid')
}

function ProtectedRoute({ children }){
  if(!isAuthenticated()) return <Navigate to="/login" replace />
  return children
}

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/principal" element={<ProtectedRoute><Principal /></ProtectedRoute>} />
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  )
}
