import React, { useState } from "react";
import "../App.css";
import LensPay from "../assets/images/lenspay.svg";
import useLensAuth from "../hooks/useLens";

const Landing = () => {
  const [form, setForm] = useState(true);

  //hooks
  const lensData = useLensAuth();

  // const openForm = () => {
  //   setForm(false);
  // };

  return (
    <div className="landing-wrapper">
      {form ? (
        <div className="landing">
          <div className="landing-content">
            <h1>Lens Pay</h1>
            <p>
              With Lens Protocol, you are in control. You own your profile,
              where you use it, how you use it, and even how you monetize it.
              That means you have the power over your content, and it’s all
              right there, as an NFT, in your wallet.
            </p>
            <button type="button" className="btn" onClick={() => lensData.fetchLensToken()}>
              <img src={LensPay} alt="lenspay" />
              Sign-in with Lens
            </button>
          </div>
          <div className="landing-poster">
            <img src={LensPay} alt="lenspay" />
          </div>
        </div>
      ) : (
        <form className="sender-form">
          <div className="input-field">
            <input
              type="text"
              placeholder="Enter reciever lens username"
              className="input"
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Enter Amount you want to send"
              className="input"
            />
          </div>
          <div className="input-field">
            <select>
              <option>Select coin</option>
              <option value="Option 1">Matic</option>
              <option value="Option 2">Ethereum</option>
            </select>
          </div>
          <div className="input-field">
            <input type="submit" value="Submit" class="btn-submit" />
          </div>
        </form>
      )}
    </div>
  );
}

export default Landing;
