
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithSocial: (provider: 'google' | 'github' | 'microsoft') => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem('auth_user');
        if (stored && stored !== "undefined" && stored !== "null") {
          const parsed = JSON.parse(stored);
          // Strict object validation
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.id) {
            setUser({
              ...parsed,
              skills: Array.isArray(parsed.skills) ? parsed.skills : []
            });
          }
        }
      } catch (e) {
        console.warn("Auth hydration protocol: State cleared for security.");
        localStorage.removeItem('auth_user');
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const demoUser: User = {
          id: '1',
          name: 'Core Architect',
          email: email,
          role: 'user',
          bio: 'Specialist in software engineering and digital marketing.',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          jobTitle: 'Senior Software Engineer',
          location: 'Remote Node',
          phone: '',
          website: '',
          skills: []
        };
        setUser(demoUser);
        localStorage.setItem('auth_user', JSON.stringify(demoUser));
        resolve();
      }, 500);
    });
  };

  const loginWithSocial = async (provider: 'google' | 'github' | 'microsoft') => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const demoUser: User = {
          id: `social-${Date.now()}`,
          name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Operator`,
          email: `${provider}@4am-network.id`,
          role: 'user',
          bio: `Authenticated via ${provider} secure uplink.`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
          jobTitle: 'Network Member',
          location: 'Global Edge Node',
          phone: '',
          website: '',
          skills: []
        };
        setUser(demoUser);
        localStorage.setItem('auth_user', JSON.stringify(demoUser));
        resolve();
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          name: name || 'Authorized User',
          email: email || '',
          role: 'user',
          bio: '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          jobTitle: 'Member',
          location: '',
          phone: '',
          website: '',
          skills: []
        };
        setUser(newUser);
        localStorage.setItem('auth_user', JSON.stringify(newUser));
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { 
      ...user, 
      ...updates,
      skills: Array.isArray(updates.skills) ? updates.skills : (user.skills || [])
    };
    setUser(updatedUser);
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithSocial, register, logout, updateProfile }}>
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
