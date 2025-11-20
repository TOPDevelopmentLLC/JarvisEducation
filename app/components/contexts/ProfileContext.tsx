import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Profile {
  id: number;
  email: string;
  accountType: 'Master' | 'Admin' | 'Teacher';
  token: string;
  schoolId: number;
  requiresPasswordReset: boolean;
  fullName: string | null;
}

interface ProfileContextType {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  return (
    <ProfileContext.Provider value={{
      profile,
      setProfile,
      notificationsEnabled,
      setNotificationsEnabled
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
