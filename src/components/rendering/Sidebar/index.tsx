import React from "react";

import { useRouter } from "next/router";
import AdminPanel from "@/components/rendering/AdminPanel";


const Sidebar = ({ headerRef, isTransparentBackground }: any) => {

  return (
    <>
      <AdminPanel/>     
    </>
  );
};

export default Sidebar;
