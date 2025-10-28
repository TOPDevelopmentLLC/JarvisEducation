import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Profile {
  id: string;
  name: string;
}

interface ProfileContextType {
  profile: Profile | null;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  //TODO: Call API to get Profile data

  useEffect(() => {
    // Mock API call
    setProfileState({ id: '1', name: 'Jane Doe' });
  }, []);

  return (
    <ProfileContext.Provider value={{
      profile,
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
