import React from "react";
import { Outlet } from "react-router-dom";
import { Cursor, HeaderTop } from "../components";
import { Toaster } from "react-hot-toast";
//utils
import ScrollToTop from "../utils/ScrollToTop";

const Main: React.FC = () => {
  return (
    <ScrollToTop>
      <Cursor />
      <HeaderTop />
      <Outlet />
      <Toaster />
    </ScrollToTop>
  );
};

export default Main;
