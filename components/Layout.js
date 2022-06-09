import Footer from "./Footer";
import NavbarNew from "./NavbarNew";
import { useRouter } from "next/router";

const Layout = ({ children }) => {

  const router  = useRouter()

  if(router.pathname != "/admin/login" ){
    return (
      <>
        <NavbarNew/>
        {children}
        <Footer />
      </>
    );
  } else {
    return (
      <>
        {children}
      </>
    );
  }
};

export default Layout;
