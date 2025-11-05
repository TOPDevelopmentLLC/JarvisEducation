import { Report } from "lib/models/report";
import { Comment } from "lib/models/comment";
import { mockReportData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface ReportContextType {
  reports: Report[];
  selectedReport: Report | null;
  setSelectedReport: (report: Report | null) => void;
  addReport: (report: Report) => void;
  deleteReport: (reportId: string) => void;
  addCommentToReport: (reportId: string, comment: Comment) => void;
  updateCommentInReport: (reportId: string, commentId: string, newBodyText: string) => void;
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

  const addCommentToReport = (reportId: string, comment: Comment) => {
    setReports(prev => prev.map(report => {
      if (report.reportId === reportId) {
        return {
          ...report,
          comments: [...(report.comments || []), comment]
        };
      }
      return report;
    }));

    // Update selectedReport if it's the one being modified
    if (selectedReport?.reportId === reportId) {
      setSelectedReport({
        ...selectedReport,
        comments: [...(selectedReport.comments || []), comment]
      });
    }
  };

  const updateCommentInReport = (reportId: string, commentId: string, newBodyText: string) => {
    setReports(prev => prev.map(report => {
      if (report.reportId === reportId) {
        return {
          ...report,
          comments: (report.comments || []).map(comment => {
            if (comment.commentId === commentId) {
              return { ...comment, bodyText: newBodyText };
            }
            return comment;
          })
        };
      }
      return report;
    }));

    // Update selectedReport if it's the one being modified
    if (selectedReport?.reportId === reportId) {
      setSelectedReport({
        ...selectedReport,
        comments: (selectedReport.comments || []).map(comment => {
          if (comment.commentId === commentId) {
            return { ...comment, bodyText: newBodyText };
          }
          return comment;
        })
      });
    }
  };

  return (
    <ReportContext.Provider value={{
      reports,
      selectedReport,
      setSelectedReport,
      addReport,
      deleteReport,
      addCommentToReport,
      updateCommentInReport
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