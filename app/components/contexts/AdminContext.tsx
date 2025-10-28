import { Administrator } from "lib/models/administrator";
import { mockAdminData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface AdminContextType {
  admins: Administrator[];
  selectedAdmin: Administrator | null;
  setSelectedAdmin: (admin: Administrator | null) => void;
  addAdmin: (admin: Administrator) => void;
  deleteAdmin: (adminId: string) => void;
  assignCodesToAdmin: (adminId: string, codeIds: string[]) => void;
  unassignCodeFromAdmin: (adminId: string, codeId: string) => void;
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

  const assignCodesToAdmin = (adminId: string, codeIds: string[]) => {
    setAdmins(prev => prev.map(admin => {
      if (admin.adminId === adminId) {
        return {
          ...admin,
          assignedCodeIds: codeIds
        };
      }
      return admin;
    }));

    // Update selectedAdmin if it's the one being modified
    if (selectedAdmin?.adminId === adminId) {
      setSelectedAdmin({
        ...selectedAdmin,
        assignedCodeIds: codeIds
      });
    }
  };

  const unassignCodeFromAdmin = (adminId: string, codeId: string) => {
    setAdmins(prev => prev.map(admin => {
      if (admin.adminId === adminId) {
        const currentCodes = admin.assignedCodeIds || [];
        return {
          ...admin,
          assignedCodeIds: currentCodes.filter(id => id !== codeId)
        };
      }
      return admin;
    }));

    // Update selectedAdmin if it's the one being modified
    if (selectedAdmin?.adminId === adminId) {
      const currentCodes = selectedAdmin.assignedCodeIds || [];
      setSelectedAdmin({
        ...selectedAdmin,
        assignedCodeIds: currentCodes.filter(id => id !== codeId)
      });
    }
  };

  return (
    <AdminContext.Provider value={{
      admins,
      selectedAdmin,
      setSelectedAdmin,
      addAdmin,
      deleteAdmin,
      assignCodesToAdmin,
      unassignCodeFromAdmin
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