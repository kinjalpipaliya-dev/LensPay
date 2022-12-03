import React, { useState } from "react";
import "../App.css";
import LensPay from "../assets/images/lenspay.svg";

function Landing() {
  const [form, setForm] = useState(true);

  const openForm = () => {
    setForm(false);
  };

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
            <button type="button" className="btn" onClick={openForm}>
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
            <select>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
              <option value="Option 4">Option 4</option>
              <option value="Option 5">Option 5</option>
              <option value="Option length">
                Option that has too long of a value to fit
              </option>
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
