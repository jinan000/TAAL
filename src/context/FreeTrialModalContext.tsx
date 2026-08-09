/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

export interface FreeTrialModalInitialData {
  danceStyle?: string;
  preferredClass?: string;
}

interface FreeTrialModalContextType {
  isOpen: boolean;
  initialData: FreeTrialModalInitialData;
  openModal: (data?: FreeTrialModalInitialData) => void;
  closeModal: () => void;
}

const FreeTrialModalContext = createContext<FreeTrialModalContextType | undefined>(undefined);

export function FreeTrialModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<FreeTrialModalInitialData>({});

  const openModal = (data?: FreeTrialModalInitialData) => {
    if (data) setInitialData(data);
    else setInitialData({});
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <FreeTrialModalContext.Provider value={{ isOpen, initialData, openModal, closeModal }}>
      {children}
    </FreeTrialModalContext.Provider>
  );
}

export function useFreeTrialModal() {
  const context = useContext(FreeTrialModalContext);
  if (!context) {
    throw new Error('useFreeTrialModal must be used within a FreeTrialModalProvider');
  }
  return context;
}
