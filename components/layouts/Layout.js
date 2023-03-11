import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#f7fcfd] min-h-screen flex justify-between flex-col">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
