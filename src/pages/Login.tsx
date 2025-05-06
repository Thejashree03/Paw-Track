import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { User, Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PawTrackLogo from '@/assets/images/logo.png';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginOption, setLoginOption] = useState<'user' | 'admin'>('user');

  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: loginOption === 'admin' ? 'admin' : 'user',
      password: loginOption === 'admin' ? 'admin123' : 'user123',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.username, data.password);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLoginOption = (option: 'user' | 'admin') => {
    setLoginOption(option);
    form.setValue('username', option === 'admin' ? 'admin' : 'user');
    form.setValue('password', option === 'admin' ? 'admin123' : 'user123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-3xl border-none bg-white/90 backdrop-blur-sm transition-all">
        <div className="flex flex-col items-center mt-6 mb-4">
          <img src="/logo.png" alt="PawTrack Logo" className="h-16 w-16 rounded-full shadow-md mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">Welcome to PawTrack</h2>
          <p className="mt-1 text-sm text-gray-500">Access your dashboard securely</p>
        </div>

        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-xl text-blue-600">Sign In</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex overflow-hidden rounded-full border border-gray-200 mb-4">
            <button
              className={`w-1/2 py-2 text-sm font-medium transition-all ${loginOption === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              onClick={() => handleLoginOption('user')}
            >
              User
            </button>
            <button
              className={`w-1/2 py-2 text-sm font-medium transition-all ${loginOption === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              onClick={() => handleLoginOption('admin')}
            >
              Admin
            </button>
          </div>

          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <AlertDescription>
              {loginOption === 'admin' ? (
                <span>Admin credentials: <strong>admin</strong> / <strong>admin123</strong></span>
              ) : (
                <span>User credentials: <strong>user</strong> / <strong>user123</strong></span>
              )}
            </AlertDescription>
          </Alert>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your username"
                          className="pl-10 rounded-full"
                          {...field}
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          className="pl-10 pr-10 rounded-full"
                          {...field}
                        />
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
              <div className="text-center mt-3">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-2 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
          <Link to="/" className="text-sm text-gray-400 hover:text-blue-600 hover:underline">
            Back to home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
