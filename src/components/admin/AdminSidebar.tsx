import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  LogOut, 
  Droplets,
  ClipboardList 
} from 'lucide-react';

/**
 * AdminSidebar: Main navigation component for the administrative dashboard.
 */
const AdminSidebar = () => {
  const location = useLocation();
  const { userRole, signOut, user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { title: 'Dashboard', url: '/admin', icon: LayoutDashboard, roles: ['super_admin', 'manager', 'secretary', 'director', 'auditor'] },
    { title: 'Daily Sales Entry', url: '/admin/sales-entry', icon: ClipboardList, roles: ['super_admin', 'manager', 'secretary'] },
    { title: 'Reports', url: '/admin/reports', icon: FileText, roles: ['super_admin', 'manager', 'director', 'auditor'] },
    { title: 'User Management', url: '/admin/users', icon: Users, roles: ['super_admin'] },
  ];

  const visibleItems = menuItems.filter(item => userRole && item.roles.includes(userRole));

  return (
    <Sidebar className="admin-sidebar-container border-r border-sidebar-border">
      
      {/* Brand Section */}
      <SidebarHeader className="sidebar-branding p-6 border-b border-sidebar-border">
        <Link to="/admin" className="brand-link flex items-center gap-3">
          <Droplets className="brand-icon h-7 w-7 text-primary" />
          <span className="brand-text font-serif text-xl font-bold text-sidebar-foreground">
            Pure Life Admin
          </span>
        </Link>
      </SidebarHeader>
      
      {/* Navigation Section */}
      <SidebarContent className="sidebar-nav-content p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="nav-group-label px-2 mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            Internal Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="nav-menu-list gap-1">
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.title} className="nav-menu-item">
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`nav-link flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive(item.url)
                          ? 'nav-link-active bg-primary text-primary-foreground shadow-md'
                          : 'nav-link-inactive text-sidebar-foreground hover:bg-sidebar-accent'
                      }`}
                    >
                      <item.icon className="nav-icon h-5 w-5" />
                      <span className="nav-text font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* Profile & Auth Section */}
      <SidebarFooter className="sidebar-user-footer p-4 border-t border-sidebar-border">
        <div className="user-profile-card space-y-4">
          <div className="user-info-wrapper px-2">
            <p className="user-email text-sm font-semibold truncate">{user?.email}</p>
            <p className="user-role-badge text-xs font-medium text-muted-foreground capitalize">
              {userRole?.replace('_', ' ')}
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="logout-button w-full"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;