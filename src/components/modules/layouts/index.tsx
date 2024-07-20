import {
  interBold,
  interMedium,
  interRegular,
  interSemiBold,
  kabutHitamRegular,
} from "@/assets/fonts/fonts";
import GlobalProvider from "@/components/contexts/globalContext/context";
import LanguageProvider from "@/components/contexts/languageContext";
import { SidebarProvider } from "@/components/contexts/sidebarContext/context";
import UserProvider from "@/components/contexts/userContext/context";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "./layout.module.scss";
import SuccessFullList from "../../rendering/SuccessfullListTable";
import Sidebar from "@/components/rendering/Sidebar";

export interface LayoutPropType {
  page: any;
  children: any;
  popup?: any;
  router?: any;
}
export default function Layout({
  page,
  children,
  popup,
  router,
}: LayoutPropType) {
  const route = useRouter();

  let globalFontVariableClass = classNames(
    interSemiBold.className,
    interRegular.variable,
    interMedium.variable,
    interBold.variable,
    kabutHitamRegular.variable
  );

  const TransparentRoutes = ["/"];

  const isTransparentBackground = TransparentRoutes.includes(router.pathname);
  const headerRef = useRef<any>(null);

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <LanguageProvider>
      <SidebarProvider>
        <UserProvider>
          {/* <Toaster /> */}
          <GlobalProvider headerHeight={headerHeight}>
            <div className={styles.layoutContainer}>
              <Sidebar
                headerRef={headerRef}
                isTransparentBackground={isTransparentBackground}
              />
              <main
                className={globalFontVariableClass}
                style={{
                  paddingTop: isTransparentBackground ? "0px" : headerHeight,

                  width: "100%",
                  backgroundColor: "#FFF9F4",
                }}
              >
                {children}
              </main>
              
            </div>
          </GlobalProvider>
        </UserProvider>
      </SidebarProvider>
    </LanguageProvider>
  );
}
