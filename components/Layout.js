import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarNew from "./NavbarNew";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}
      <NavbarNew/>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
