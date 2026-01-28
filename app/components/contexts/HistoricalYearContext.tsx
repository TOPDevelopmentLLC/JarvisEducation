import { SchoolYearSettings } from "lib/models/schoolYearSettings";
import { createContext, ReactNode, useContext, useState } from "react";


interface HistoricalYearContextType {
    selectedHistoricalYear: SchoolYearSettings | null;
    setSelectedHistoricalYear: (settings: SchoolYearSettings | null) => void;
}

const HistoricalYearContext = createContext<HistoricalYearContextType | undefined>(undefined);

export const HistoricalYearProvider = ({ children }: { children: ReactNode }) => {
    const [selectedHistoricalYear, setSelectedHistoricalYear] = useState<SchoolYearSettings | null>(null);

    return (
        <HistoricalYearContext.Provider value={{
            selectedHistoricalYear,
            setSelectedHistoricalYear
        }}>
            {children}
        </HistoricalYearContext.Provider>
    )
}

export const useHistoricalYear = (): HistoricalYearContextType => {
    const context = useContext(HistoricalYearContext);
    if (!context) {
        throw new Error('useHistoricalYear must be used within a HistoricalYearProvider');
    }
    return context;
}
