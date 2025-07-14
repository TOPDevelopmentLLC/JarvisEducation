import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Profile {
  id: string;
  name: string;
}

interface ProfileContextType {
  profile: Profile | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<Profile | null>(null);

  //TODO: Call API to get Profile data

  useEffect(() => {
    // Mock API call
    setProfileState({ id: '1', name: 'Jane Doe' });
  }, []);

  return (
    <ProfileContext.Provider value={{ profile }}>
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
