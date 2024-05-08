import React from "react";
import NavHeader from "../header-section/nav-header";
import { Toaster } from "../ui/toaster";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <NavHeader />
      {children}
      <Toaster />
    </main>
  );
};

export default PageLayout;
