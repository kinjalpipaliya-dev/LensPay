import "../App.css";
import LensPay from "../assets/images/lenspay.svg";

function PaymentForm() {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1>Lensss Pay</h1>
        <p>
          With Lens Protocol, you are in control. You own your profile, where
          you use asdait, how you use it, and even how you monetize it. That
          means you have the power over your content, and it’s all right there,
          as an NFT, in your wallet.
        </p>
        <button type="button" className="btn">
          <img src={LensPay} alt="lenspay" />
          Sign-in with Lens
        </button>
      </div>
      <div className="landing-poster">
        <img src={LensPay} alt="lenspay" />
      </div>
    </div>
  );
}

export default PaymentForm;
