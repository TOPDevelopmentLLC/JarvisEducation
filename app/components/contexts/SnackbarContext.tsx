import React, { createContext, useCallback, useContext, useState } from 'react';
import { Snackbar } from 'react-native-paper';

enum SnackbarType { default, success, error };

interface SnackbarContextType {
  showMessage: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>(SnackbarType.default);

  const showMessage = useCallback((text: string, variant: SnackbarType = SnackbarType.default) => {
    setMessage(text);
    setType(variant);
    setVisible(true);
  }, []);

  const onDismissSnackBar = () => setVisible(false);

  const getBackgroundColor = () => {
    switch (type) {
      case SnackbarType.success:
        return '#22c55e';
      case SnackbarType.error:
        return '#ef4444';
      default:
        return undefined;
    }
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        style={{
          marginBottom: 20,
          backgroundColor: getBackgroundColor(),
        }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): ((msg: string) => void) => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return (msg: string) => context.showMessage(msg, SnackbarType.default);
};

export const useSuccessSnackbar = (): ((msg: string) => void) => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSuccessSnackbar must be used within a SnackbarProvider');
  }
  return (msg: string) => context.showMessage(msg, SnackbarType.success);
};

export const useErrorSnackbar = (): ((msg: string) => void) => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useErrorSnackbar must be used within a SnackbarProvider');
  }
  return (msg: string) => context.showMessage(msg, SnackbarType.error);
};
