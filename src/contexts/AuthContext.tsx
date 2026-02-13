import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, FarmerProfile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  farmerProfile: FarmerProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, profileData: Omit<FarmerProfile, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFarmerProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (!error && data) {
      setFarmerProfile(data);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchFarmerProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (() => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchFarmerProfile(session.user.id);
        } else {
          setFarmerProfile(null);
        }
        setLoading(false);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, profileData: Omit<FarmerProfile, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('farmers')
        .insert([{
          id: data.user.id,
          ...profileData,
        }]);

      if (profileError) throw profileError;
      await fetchFarmerProfile(data.user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setFarmerProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchFarmerProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{ user, farmerProfile, loading, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
