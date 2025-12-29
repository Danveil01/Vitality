import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ShieldAlert, Clock } from 'lucide-react';

/**
 * ProtectedRoute: Higher-Order Component for route-level access control.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const { user, userRole, loading } = useAuth();

  // Loading View
  if (loading) {
    return (
      <div className="page-loader-screen min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="loader-icon h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Auth Guard
  if (!user) return <Navigate to="/auth" replace />;

  // Pending Access View
  if (!userRole) {
    return (
      <div className="access-screen access-pending min-h-screen flex items-center justify-center p-6">
        <div className="status-card text-center max-w-sm p-8 border rounded-2xl bg-card">
          <Clock className="status-icon h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h2 className="status-title text-2xl font-bold mb-3">Access Pending</h2>
          <p className="status-desc text-muted-foreground">Admin approval required.</p>
        </div>
      </div>
    );
  }

  // Unauthorized View
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return (
      <div className="access-screen access-denied min-h-screen flex items-center justify-center p-6">
        <div className="status-card text-center max-w-sm p-8 border rounded-2xl bg-card">
          <ShieldAlert className="status-icon h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="status-title text-2xl font-bold mb-3">Access Denied</h2>
          <p className="status-desc text-muted-foreground">Unauthorized role.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;