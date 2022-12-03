import React, { useRef, useState } from "react";
import "../App.css";
import LensPay from "../assets/images/lenspay.svg";
import Banner from "../assets/images/banner.svg";
import useLensAuth from "../hooks/useLens";
import logo from "../assets/images/logo.svg";
import useSendTokens from "../hooks/useSendToken";
import ERC20Tokens from "../tokens/tokens.json";

const Landing = () => {

  //hooks
  const lensData = useLensAuth();
  const sendPayment = useSendTokens();

  const [tokenData, setTokenData] = useState();

  const handleRef = useRef();
  const amountRef = useRef();

  return (
    <>
     <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" width="157" height="36" />
      </div>
      {lensData.screen && <div className="lens-pay-id">{lensData.lensHandle}</div>}
    </header>
    <div className="landing-wrapper">
      {!lensData.screen ? (
        <div className="landing">
          <div className="landing-content">
            <h1>Lens Pay</h1>
            <p>
              With Lens Protocol, you are in control. You own your profile,x c
              where you use it, how you use it, and even how you monetize it.
              That means you have the power over your content, and it’s all
              right there, as an NFT, in your wallet.
            </p>
            <button type="button" className="btn" onClick={() => lensData.connectWallet()}>
              <img src={LensPay} alt="lenspay" />
              Sign-in with Lens
              {lensData.isLoading && <div className="loading"></div>}
            </button>
          </div>
          <div className="landing-poster">
            <img src={Banner} alt="lenspay" />
          </div>
        </div>
      ) : (
        <form className="sender-form">
          <div className="input-field">
            <input
              type="text"
              placeholder="Enter reciever lens username"
              className="input"
              ref={handleRef}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Enter Amount you want to send"
              className="input"
              ref={amountRef}
            />
          </div>
          <div className="input-field">
            <select>
              <option>Select coin</option>
              {Object.keys(ERC20Tokens).map((item, index) => {
                console.log("Tokens:",item);
                  return (
                      <option key={index} onClick={() => setTokenData(ERC20Tokens[item])}>{item}</option>
                  )
              })}
            </select>
          </div>
          <div className="input-field">
          <button type="button" className="btn" onClick={() => sendPayment.sendTokens(amountRef?.current?.value,handleRef?.current?.value,lensData.address,ERC20Tokens[tokenData?.symbol]?.address)}>
            Submit
            {sendPayment.isLoading && <div className="loading"></div>}
          </button>
          </div>
        </form>
      )}
    </div>
    </>
  );
}

export default Landing;
