import { createContext, useContext, useState, type ReactNode } from 'react';

export type TransitionType = 'fade' | 'slide' | 'zoom' | 'flip';

interface TransitionContextType {
  transition: TransitionType;
  setTransition: (type: TransitionType) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [transition, setTransition] = useState<TransitionType>('slide');

  return (
    <TransitionContext.Provider value={{ transition, setTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}
