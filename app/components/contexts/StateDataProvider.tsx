import { ReactNode } from "react";
import { AdminProvider } from "./AdminContext";
import { TeacherProvider } from "./TeacherContext";
import { StudentProvider } from "./StudentContext";
import { CourseProvider } from "./CourseContext";
import { ReportProvider } from "./ReportContext";
import { CodeProvider } from "./CodeContext";


interface StateDataProviderProps {
    children: ReactNode;
}

export default function StateDataProvider({ children }: StateDataProviderProps) {
    return (
        <AdminProvider>
            <TeacherProvider>
                <StudentProvider>
                    <CourseProvider>
                        <ReportProvider>
                            <CodeProvider>
                                { children }
                            </CodeProvider>
                        </ReportProvider>
                    </CourseProvider>
                </StudentProvider>
            </TeacherProvider>
        </AdminProvider>
    )
}