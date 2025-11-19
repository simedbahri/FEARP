
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="max-w-5xl mx-auto">
      {isLoggedIn ? <AdminDashboard /> : <AdminLogin />}
    </div>
  );
};

export default AdminPage;
