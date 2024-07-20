import { addClassToDocumentElement, removeClassToDocumentElement } from "@/utils";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SidebarContextType {
  open: boolean;
  content: ReactNode;
  openSidebar: (content: ReactNode) => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openSidebar = (newContent: ReactNode) => {
    setContent(newContent);
    // addClassToDocumentElement("no-scroll");
    setOpen(true);
  };

  const closeSidebar = () => {
    setOpen(false);
    // removeClassToDocumentElement("no-scroll");
    setContent(null);
  };

  return (
    <SidebarContext.Provider
      value={{ open, content, openSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
