import { createContext, useContext, useState, ReactNode } from 'react';

type FilterContextProps = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
};

export const FilterContext = createContext<FilterContextProps | null>(null);
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('root 로 감싸기');
  return context;
};
export function FilterProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <FilterContext.Provider value={{ isOpen, open, close, toggle }}>{children}</FilterContext.Provider>;
}
