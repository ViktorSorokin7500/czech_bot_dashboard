import React from "react";
import Sidebar from "../../../components/dashboard/sidebar/sidebar";
import Navbar from "../../../components/dashboard/navbar/navbar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <div className="w-80 bg-backgroundSoft hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 p-5">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
