import { Report } from "lib/models/report";
import { mockReportData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface ReportContextType {
  reports: Report[];
  selectedReport: Report | null;
  setSelectedReport: (report: Report | null) => void;
  addReport: (report: Report) => void;
  deleteReport: (reportId: string) => void;
}

const ReportContext = createContext<ReportContextType|undefined>(undefined);

export const ReportProvider = ({ children }: {children:ReactNode}) => {
  const [reports, setReports] = useState<Report[]>(mockReportData);
  const [selectedReport,setSelectedReport] = useState<Report|null>(null);

  const addReport = (report: Report) => {
    setReports(prev => [...prev, report]);
  };

  const deleteReport = (reportId: string) => {
    setReports(prev => prev.filter(r => r.reportId !== reportId));
  };

  return (
    <ReportContext.Provider value={{
      reports,
      selectedReport,
      setSelectedReport,
      addReport,
      deleteReport
    }}>
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