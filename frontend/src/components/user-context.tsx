import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

interface User {
  user_id: number;
  user_username: string;
  user_email: string;
  user_role: 'user' | 'admin';
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

async function fetchCurrentUser(): Promise<User> {
  const response = await fetch("https://fitfinder-backend-l8ma.onrender.com/user/me", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Not Authenticated");
  return response.json();
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  const isAdmin = user?.user_role === 'admin';
  console.log("UserContext:", { user, isLoading, isAdmin });
  return (
    <UserContext.Provider value={{ user: user || null, isLoading, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}