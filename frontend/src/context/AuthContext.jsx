import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch('/api/v1/users/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Error checking authentication status:', err);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data.user);
      toast({
        title: 'Registration successful',
        description: 'Your account has been created successfully.',
        variant: 'success',
      });
      navigate('/dashboard');
      return data;
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Registration failed',
        description: err.message,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.user);
      toast({
        title: 'Login successful',
        description: 'You have been logged in successfully.',
        variant: 'success',
      });
      navigate('/dashboard');
      return data;
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Login failed',
        description: err.message,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/v1/users/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Logout failed');
      }

      setUser(null);
      toast({
        title: 'Logout successful',
        description: 'You have been logged out successfully.',
        variant: 'success',
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Logout failed',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/v1/users/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      toast({
        title: 'Reset email sent',
        description: 'Check your email for password reset instructions.',
        variant: 'success',
      });
      return data;
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Failed to send reset email',
        description: err.message,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (token, password, confirmPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/v1/users/password/reset/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      toast({
        title: 'Password reset successful',
        description: 'Your password has been reset successfully.',
        variant: 'success',
      });
      navigate('/login');
      return data;
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Password reset failed',
        description: err.message,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/v1/users/password/change', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password change failed');
      }

      toast({
        title: 'Password changed',
        description: 'Your password has been changed successfully.',
        variant: 'success',
      });
      return data;
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Password change failed',
        description: err.message,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
