import { Report } from "lib/models/report";
import { createContext, ReactNode, useContext, useState } from "react";


const ReportContext = createContext(null);

export const ReportProvider = ({ children }: {children:ReactNode}) => {
    const [selectedReport,setSelectedReport] = useState<Report|null>(null);

      return (
        <ReportContext.Provider value={{ selectedReport, setSelectedReport }}>
            {children}
        </ReportContext.Provider>
      )
      
}

export const useSelectedReport = () => useContext(ReportContext);