import { Administrator } from "lib/models/administrator";
import { mockAdminData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface AdminContextType {
  admins: Administrator[];
  selectedAdmin: Administrator | null;
  setSelectedAdmin: (admin: Administrator | null) => void;
  addAdmin: (admin: Administrator) => void;
  deleteAdmin: (adminId: string) => void;
}

const AdminContext = createContext<AdminContextType|undefined>(undefined);

export const AdminProvider = ({ children }: {children:ReactNode}) => {
  const [admins, setAdmins] = useState<Administrator[]>(mockAdminData);
  const [selectedAdmin,setSelectedAdmin] = useState<Administrator|null>(null);

  const addAdmin = (admin: Administrator) => {
    setAdmins(prev => [...prev, admin]);
  };

  const deleteAdmin = (adminId: string) => {
    setAdmins(prev => prev.filter(a => a.adminId !== adminId));
  };

  return (
    <AdminContext.Provider value={{
      admins,
      selectedAdmin,
      setSelectedAdmin,
      addAdmin,
      deleteAdmin
    }}>
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