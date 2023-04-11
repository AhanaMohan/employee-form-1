import { FC, useState, createContext } from 'react';
type SidebarContext = {
  sidebarToggle: any;
  openSidebar: Boolean;
  setOpenSidebar: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  handleOpenSidebar: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider: FC = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarToggle,
        toggleSidebar,
        closeSidebar,
        openSidebar,
        setOpenSidebar,
        handleOpenSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
