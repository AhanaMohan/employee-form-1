import { FC, useState, createContext } from 'react';
type HeaderContext = {
  company: string;
  branch: string;
  setCompany: any;
  setBranch: any;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const HeaderContext = createContext<HeaderContext>({} as HeaderContext);

export const HeaderProvider: FC = ({ children }) => {
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');

  return (
    <HeaderContext.Provider
      value={{
        company,
        setCompany,
        branch,
        setBranch
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
