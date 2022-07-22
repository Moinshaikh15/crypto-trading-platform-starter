import "./styles.css";
import { useContext, useRef, useEffect } from "react";
import coinData from "../../contexts/coinData";

function Popup() {
  let coinDataContext = useContext(coinData);

  return (
    <div className="pop-up" style={{ opacity: coinDataContext.popup ? "100%" : "0" }}>
      <h4>Buy Bitcoin</h4>
      <p>current Price:$50</p>
      <input type="text" name="input" id="input" /> <label htmlFor="input">Max</label>
      <div>
        <input type="radio" name="radio-btn" id="btn1" />
        <label htmlFor="btn1">Buy</label>
        <input type="radio" name="radio-btn" id="btn2" />
        <label htmlFor="btn2">Sell</label>
      </div>
      <button>Buy</button>
    </div>
  );
}

export default Popup;
