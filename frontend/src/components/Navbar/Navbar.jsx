import { Link } from "react-router-dom";
import LogoAzart from "../../assets/images/logo.png";

import "./Navbar.scss";

function Navbar() {
  return (
    <div className="nav-header">
      <div className="logo-azart">
        <Link to="/">
          <img className="logo-navbar" src={LogoAzart} alt="Logo Az'art" />
          <h1 className="site-name">Az'Art</h1>
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
