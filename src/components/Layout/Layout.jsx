import React, { useContext } from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import {
  THEME,
  ThemeContext,
  ThemeProvider,
} from "../../contexts/ThemeContext";

import { ToastContainer } from "react-toastify";

const LayoutComponent = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const classValue =
    theme === THEME.DARK
      ? "overflow-auto bg-gray-700"
      : "overflow-auto bg-white";

  return (
    <div className={classValue}>
      <ToastContainer position="top-left" />
      <div className="mx-4 my-3">
        <Header />
        <Menu />
        {children}
        <Footer />
      </div>
    </div>
  );
};

const Layout = ({ children }) => (
  <ThemeProvider startingTheme={THEME.DARK}>
    <LayoutComponent>{children}</LayoutComponent>
  </ThemeProvider>
);

export default Layout;
