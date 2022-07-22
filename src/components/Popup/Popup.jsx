import "./styles.css";
import { useContext, useRef } from "react";
import coinData from "../../contexts/coinData";

function Popup(props) {
  let coinDataContext = useContext(coinData);
  let popupRef = useRef(null);

  return (
    <div className="pop-up">

      <div className="header">
        <h4>Buy Bitcoin</h4>
      </div>

      <p>current Price:$50</p>

      <div className="input-container">
        <input type="text" name="input" id="input" />
        <label htmlFor="input">Max</label>
      </div>

      <div className="buy-sell">
        <div>
          <input type="radio" name="radio-btn" id="btn1" />
          <label htmlFor="btn1">Buy</label>
        </div>

        <div>
          <input type="radio" name="radio-btn" id="btn2" />
          <label htmlFor="btn2">Sell</label>
        </div>

      </div>


      <button onClick={() => coinDataContext.dispatch({ type: 'popUp-toggle' })}>Buy</button>
    </div>
  );
}

export default Popup;
