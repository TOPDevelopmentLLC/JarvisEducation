import { Code } from "lib/models/code";
import { mockCodeData } from "lib/mockData";
import { createContext, ReactNode, useContext, useState } from "react";


interface CodeContextType {
  codes: Code[];
  selectedCode: Code | null;
  setSelectedCode: (code: Code | null) => void;
  addCode: (code: Code) => void;
  updateCode: (code: Code) => void;
  deleteCode: (codeId: string) => void;
}

const CodeContext = createContext<CodeContextType|undefined>(undefined);

export const CodeProvider = ({ children }: {children:ReactNode}) => {
  const [codes, setCodes] = useState<Code[]>(mockCodeData);
  const [selectedCode, setSelectedCode] = useState<Code|null>(null);

  const addCode = (code: Code) => {
    setCodes(prev => [...prev, code]);
  };

  const updateCode = (code: Code) => {
    setCodes(prev => prev.map(c => c.codeId === code.codeId ? code : c));
  };

  const deleteCode = (codeId: string) => {
    setCodes(prev => prev.filter(c => c.codeId !== codeId));
  };

  return (
    <CodeContext.Provider value={{
      codes,
      selectedCode,
      setSelectedCode,
      addCode,
      updateCode,
      deleteCode
    }}>
      {children}
    </CodeContext.Provider>
  )
}

export const useStoredCodeData = (): CodeContextType => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useStoredCodeData must be used within a CodeProvider');
  }
  return context;
}
