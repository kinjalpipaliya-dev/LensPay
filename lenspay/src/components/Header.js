import "../App.css";
import logo from "../assets/images/logo.svg";
import useLensAuth from "../hooks/useLens";

function Header() {

  //hooks
  const lensData = useLensAuth();

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" width="157" height="36" />
      </div>
      {lensData.screen && <div className="lens-pay-id">kinjal.lens</div>}
    </header>
  );
}

export default Header;
