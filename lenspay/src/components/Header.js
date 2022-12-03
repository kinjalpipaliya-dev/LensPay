import "../App.css";
import logo from "../assets/images/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" width="157" height="36" />
      </div>
      <div className="lens-pay-id">kinjal.lens</div>
    </header>
  );
}

export default Header;
