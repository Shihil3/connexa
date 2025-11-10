import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Feed from './pages/Feed';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">✅ Tailwind is Working!</h1>
    </div>
  );
}


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={token ? <Feed /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/feed" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
