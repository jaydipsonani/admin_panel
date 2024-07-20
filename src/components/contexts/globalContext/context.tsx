import { FC, ReactNode, createContext, useState } from "react";

type GlobalContextType = {
  setPopularData: (popularData: any) => void;
  popularData: any;
  getpopularData: () => void;
  headerHeight: any;
};

export const GlobalContext = createContext<GlobalContextType>({
  setPopularData: () => {},
  popularData: undefined,
  getpopularData: () => {},
  headerHeight: null,
});

const GlobalProvider: FC<{ children: ReactNode; headerHeight: any }> = ({
  children,
  headerHeight,
}) => {
  const [popularData, setPopularData] = useState(null);
  const getpopularData = async () => {};
  const globalContextValue = {
    popularData,
    setPopularData,
    getpopularData,
    headerHeight,
  };

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
