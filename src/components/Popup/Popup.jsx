import "./styles.css";
import { useContext, useState } from "react";
import coinData from "../../contexts/coinData";

function Popup(props) {
  let { state, dispatch } = useContext(coinData);

  let [selected, setSelected] = useState();
  let [inputValue, setInputValue] = useState();

  return (
    <div className="pop-up">
      {state.currentSelected === null ? (
        ""
      ) : (
        <>
          <div className="header">
            <h4>Buy {state.currentSelected.coinName}</h4>
            <h4 onClick={() => dispatch({ type: "popUp-toggle" })} style={{ cursor: "pointer" }}>
              ☓
            </h4>
          </div>

          <p>current Price:${state.currentSelected.price}</p>

          <div className="input-container">
            <input type="number" name="input" id="input" onChange={(e) => setInputValue(e.target.value)} required />
            <label htmlFor="input" style={{ overflow: "hidden" }}>
              Max {selected === "buy" ? Math.round(state.wallet / state.currentSelected.price) : ""}
            </label>
          </div>

          <div className="buy-sell">
            <div>
              <input
                type="radio"
                name="radio-btn"
                id="btn1"
                onClick={() => {
                  setSelected("buy");
                }}
              />
              <label htmlFor="btn1">Buy</label>
            </div>

            <div>
              <input type="radio" name="radio-btn" id="btn2" onClick={() => setSelected("sell")} />
              <label htmlFor="btn2">Sell</label>
            </div>
          </div>

          <button
            onClick={() => {
              dispatch({ type: selected, payload: { currentSelected: state.currentSelected, time: Date.now(), count: inputValue } });
              dispatch({ type: "popUp-toggle" });
            }}
          >
            Buy
          </button>
        </>
      )}
    </div>
  );
}

export default Popup;
