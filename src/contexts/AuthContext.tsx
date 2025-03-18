
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'basic' | 'premium';
  subscriptionStatus: 'active' | 'canceled' | 'trial';
  trialEndsAt?: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    
    if (storedUser && isAuth) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real implementation, this would be an API call
      // For demo purposes, we'll simulate a successful login
      if (email && password) {
        // Mock user data - in a real app this would come from the backend
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email,
          plan: 'free',
          subscriptionStatus: 'trial',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAuthenticated', 'true');
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao NutriGênio!",
        });
        
        navigate('/dashboard');
      } else {
        throw new Error('Email e senha são obrigatórios');
      }
    } catch (error) {
      toast({
        title: "Erro de autenticação",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao fazer login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real implementation, this would be an API call
      if (name && email && password) {
        // Mock user registration - in a real app this would be handled by the backend
        const mockUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          plan: 'free',
          subscriptionStatus: 'trial',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAuthenticated', 'true');
        
        toast({
          title: "Conta criada com sucesso",
          description: "Bem-vindo ao NutriGênio!",
        });
        
        navigate('/dashboard');
      } else {
        throw new Error('Todos os campos são obrigatórios');
      }
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao registrar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
