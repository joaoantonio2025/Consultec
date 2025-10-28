import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Layout/Navbar'
import Home from './pages/Home'
import Specialties from './pages/Specialties'
import Doctors from './pages/Doctors'
import DashboardDoctor from './pages/DashboardDoctor'
import DashboardAdmin from './pages/DashboardAdmin'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/especialidades" element={<Specialties />} />
          <Route path="/medicos" element={<Doctors />} />
          <Route path="/dashboard-medico" element={<DashboardDoctor />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App