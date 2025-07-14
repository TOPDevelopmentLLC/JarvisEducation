import { Administrator } from "lib/models/administrator";
import { createContext, ReactNode, useContext, useState } from "react";


const AdminContext = createContext(null);

export const AdminProvider = ({ children }: {children:ReactNode}) => {
    const [selectedAdmin,setSelectedAdmin] = useState<Administrator|null>(null);

      return (
        <AdminContext.Provider value={{ selectedAdmin, setSelectedAdmin }}>
            {children}
        </AdminContext.Provider>
      )
      
}

export const useSelectedAdmin = () => useContext(AdminContext);