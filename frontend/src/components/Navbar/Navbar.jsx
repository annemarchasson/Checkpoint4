import { Link } from "react-router-dom";
import LogoAzart from "../../assets/images/logo.png";

function Navbar() {
  return (
    <div className="nav-header">
      <div className="logo-azart">
        <Link to="/">
          <img src={LogoAzart} alt="Logo Az'art" />
          <h1 className="site-name">Az'art</h1>
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
