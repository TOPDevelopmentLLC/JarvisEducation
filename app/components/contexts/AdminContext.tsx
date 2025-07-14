import { Administrator } from "lib/models/administrator";
import { createContext, ReactNode, useContext, useState } from "react";


interface AdminContextType {
  selectedAdmin: Administrator | null;
  setSelectedAdmin: (teacher: Administrator | null) => void;
}

const AdminContext = createContext<AdminContextType|undefined>(undefined);

export const AdminProvider = ({ children }: {children:ReactNode}) => {
  const [selectedAdmin,setSelectedAdmin] = useState<Administrator|null>(null);

  return (
    <AdminContext.Provider value={{ selectedAdmin, setSelectedAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useStoredAdminData = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useStoredAdminData must be used within a AdminProvider');
  }
  return context;
}