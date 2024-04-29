import React from "react";
import NavHeader from "../header-section/nav-header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <NavHeader />
      {children}
    </main>
  );
};

export default PageLayout;
