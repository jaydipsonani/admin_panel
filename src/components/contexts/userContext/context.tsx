import { toastError, toastSuccess } from "@/utils";
import { getCookie, removeCookie } from "@/utils/useHooks/useCookies";
import {
  getItemFromLocal,
  removeItemFromLocal,
} from "@/utils/useHooks/useStorage";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  userDetails: any;
  handleOnLogOut: any;
};

export const UserContext = createContext<UserContextType>({
  userDetails: undefined,
  handleOnLogOut: () => {},
});

const UserProvider = ({ children }: any) => {
  const [userDetails, setUserDetails] = useState(null);
  const route = useRouter();

  useEffect(() => {
    let getToken = getCookie("waotoken");
    if (getToken) {
      let letetsuserDetails = getItemFromLocal("userDetails");
      setUserDetails(letetsuserDetails);
    } else {
      removeItemFromLocal("userDetails");
    }
  }, [route]);

  const handleOnLogOut = () => {
    removeItemFromLocal("userDetails");
    removeCookie("waotoken");
    route.push("/");
    setUserDetails(null);
    toastError("Logout Successfully");
  };

  return (
    <UserContext.Provider value={{ userDetails, handleOnLogOut }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);

export default UserProvider;
