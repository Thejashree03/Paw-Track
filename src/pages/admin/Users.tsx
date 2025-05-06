
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Customer', active: true, createdAt: '2023-01-15' },
  { id: 2, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', active: true, createdAt: '2023-02-20' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Employee', active: false, createdAt: '2023-03-10' },
  { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', active: true, createdAt: '2023-03-25' },
  { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'Customer', active: true, createdAt: '2023-04-05' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Employee', active: true, createdAt: '2023-04-15' },
  { id: 7, name: 'Robert Miller', email: 'robert@example.com', role: 'Customer', active: false, createdAt: '2023-05-02' },
  { id: 8, name: 'Jennifer White', email: 'jennifer@example.com', role: 'Customer', active: true, createdAt: '2023-05-18' },
];

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Active' && user.active) ||
      (statusFilter === 'Inactive' && !user.active);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roles = ['All', ...Array.from(new Set(mockUsers.map(user => user.role)))];

  const handleAddUser = () => {
    toast.info('Add user functionality would be implemented here');
  };

  const handleEditUser = (id: number) => {
    toast.info(`Edit user with ID: ${id}`);
  };

  const handleDeleteUser = (id: number) => {
    toast.success(`User with ID: ${id} has been deleted`);
  };

  const handleToggleStatus = (id: number, currentStatus: boolean) => {
    toast.success(`User status changed to ${currentStatus ? 'inactive' : 'active'}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-gray-500">Manage user accounts and permissions.</p>
        </div>
        <Button 
          className="mt-4 sm:mt-0 bg-pawtrack-blue hover:bg-pawtrack-blue-dark"
          onClick={handleAddUser}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role} Roles</option>
                ))}
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                        ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'Employee' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.active ? (
                        <span className="inline-flex items-center text-green-600">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          <span className="hidden sm:inline">Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-600">
                          <XCircle className="mr-1 h-4 w-4" />
                          <span className="hidden sm:inline">Inactive</span>
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{user.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(user.id, user.active)}
                          className="hidden sm:inline-flex h-8"
                        >
                          {user.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No users found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
