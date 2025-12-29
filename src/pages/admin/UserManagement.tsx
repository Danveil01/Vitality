import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Loader2, UserPlus, Trash2, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Constants } from '@/integrations/supabase/types';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

const ROLES = Constants.public.Enums.app_role;

const roleColors: Record<AppRole, string> = {
  super_admin: 'bg-destructive text-destructive-foreground',
  manager: 'bg-primary text-primary-foreground',
  secretary: 'bg-accent text-accent-foreground',
  director: 'bg-water-deep text-primary-foreground',
  auditor: 'bg-muted text-muted-foreground',
};

const UserManagement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<AppRole | ''>('');

  // Fetch all profiles with their roles
  const { data: users, isLoading } = useQuery({
    queryKey: ['users-with-roles'],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles for all users
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Combine profiles with roles
      return profiles?.map((profile) => ({
        ...profile,
        role: roles?.find((r) => r.user_id === profile.user_id)?.role || null,
        roleId: roles?.find((r) => r.user_id === profile.user_id)?.id || null,
      }));
    },
  });

  // Assign role mutation
  const assignRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      // Check if user already has a role
      const { data: existing } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role, granted_by: user?.id })
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase.from('user_roles').insert({
          user_id: userId,
          role,
          granted_by: user?.id,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success('Role assigned successfully');
      queryClient.invalidateQueries({ queryKey: ['users-with-roles'] });
      setSelectedUserId(null);
      setSelectedRole('');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to assign role');
    },
  });

  // Remove role mutation
  const removeRoleMutation = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabase.from('user_roles').delete().eq('id', roleId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Role removed successfully');
      queryClient.invalidateQueries({ queryKey: ['users-with-roles'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove role');
    },
  });

  const handleAssignRole = () => {
    if (selectedUserId && selectedRole) {
      assignRoleMutation.mutate({ userId: selectedUserId, role: selectedRole });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground">User Management</h2>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Registered Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((userItem) => (
                  <TableRow key={userItem.id}>
                    <TableCell className="font-medium">{userItem.full_name}</TableCell>
                    <TableCell>{userItem.email}</TableCell>
                    <TableCell>
                      {userItem.role ? (
                        <Badge className={roleColors[userItem.role]}>
                          {userItem.role.replace('_', ' ')}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">No role assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {selectedUserId === userItem.user_id ? (
                          <div className="flex items-center gap-2">
                            <Select
                              value={selectedRole}
                              onValueChange={(value) => setSelectedRole(value as AppRole)}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                {ROLES.map((role) => (
                                  <SelectItem key={role} value={role}>
                                    {role.replace('_', ' ')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              onClick={handleAssignRole}
                              disabled={!selectedRole || assignRoleMutation.isPending}
                            >
                              {assignRoleMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'Save'
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedUserId(null);
                                setSelectedRole('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUserId(userItem.user_id);
                                setSelectedRole(userItem.role || '');
                              }}
                            >
                              <UserPlus className="h-4 w-4 mr-1" />
                              {userItem.role ? 'Change Role' : 'Assign Role'}
                            </Button>
                            {userItem.roleId && userItem.user_id !== user?.id && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove Role</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove the role from {userItem.full_name}?
                                      They will lose access to the admin portal.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => removeRoleMutation.mutate(userItem.roleId!)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Remove Role
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {users?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-sm">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Badge className={roleColors.super_admin}>Super Admin</Badge>
              <span className="text-muted-foreground">Full access to all features including user management</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={roleColors.manager}>Manager</Badge>
              <span className="text-muted-foreground">Can manage daily records and view reports</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={roleColors.secretary}>Secretary</Badge>
              <span className="text-muted-foreground">Can enter and edit daily sales records</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={roleColors.director}>Director</Badge>
              <span className="text-muted-foreground">Can view dashboard and reports</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={roleColors.auditor}>Auditor</Badge>
              <span className="text-muted-foreground">Read-only access to all records</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
