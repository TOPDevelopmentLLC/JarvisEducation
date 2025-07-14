import { Report } from "lib/models/report";
import { createContext, ReactNode, useContext, useState } from "react";


interface ReportContextType {
  selectedReport: Report | null;
  setSelectedReport: (report: Report | null) => void;
}

const ReportContext = createContext<ReportContextType|undefined>(undefined);

export const ReportProvider = ({ children }: {children:ReactNode}) => {
  const [selectedReport,setSelectedReport] = useState<Report|null>(null);

  return (
    <ReportContext.Provider value={{ selectedReport, setSelectedReport }}>
      {children}
    </ReportContext.Provider>
  )
}

export const useStoredReportData = (): ReportContextType => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useStoredReportData must be used within a ReportProvider');
  }
  return context;
}