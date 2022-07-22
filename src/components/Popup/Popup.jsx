import "./styles.css";
import { useContext, useRef } from "react";
import coinData from "../../contexts/coinData";

function Popup(props) {
  let coinDataContext = useContext(coinData);
  let popupRef = useRef(null);

  return (
    <div ref={popupRef} className="pop-up">
      {coinDataContext.dispatch({ type: "popUp-toggle", payLoad: popupRef })}
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
