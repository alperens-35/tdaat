import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('[AuthProvider] useEffect çalıştı');
    let isMounted = true;

    // 1. Mevcut oturumu al
    supabase.auth.getSession()
      .then(({ data, error }) => {
        console.log('[AuthProvider] getSession cevabı:', { data, error });
        if (error) {
          console.error('[AuthProvider] getSession hatası:', error);
        }
        if (isMounted) {
          setSession(data.session);
          setUser(data.session?.user ?? null);
          setIsReady(true);
          console.log('[AuthProvider] isReady true oldu, session:', data.session);
        }
      })
      .catch((err) => {
        console.error('[AuthProvider] getSession beklenmedik hata:', err);
        if (isMounted) {
          setIsReady(true); // Hata olsa da ready yapalım ki sonsuz döngü olmasın
        }
      });

    // 2. Oturum değişikliklerini dinle
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[AuthProvider] onAuthStateChange event:', event, 'session:', session);
      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setIsReady(true);
      }
    });

    return () => {
      console.log('[AuthProvider] cleanup');
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isReady }}>
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