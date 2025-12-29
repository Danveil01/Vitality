import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

const AdminLayout: React.FC = () => {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />
          <main className="flex-1 flex flex-col">
            <header className="h-14 border-b border-border flex items-center px-4 bg-background">
              <SidebarTrigger className="mr-4" />
              <h1 className="font-serif text-lg font-semibold text-foreground">
                Admin Dashboard
              </h1>
            </header>
            <div className="flex-1 p-6 bg-muted/30">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default AdminLayout;
