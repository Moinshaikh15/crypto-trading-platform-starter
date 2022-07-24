import "./styles.css";
import { useContext, useRef, useState } from "react";
import coinData from "../../contexts/coinData";

function Popup(props) {
  let { state, dispatch } = useContext(coinData);

  let [selected, setSelected] = useState("buy");
  let [inputValue, setInputValue] = useState();

  function getMaxValue() {
    if (selected === "buy") {
      if (state.wallet !== 0) {
        return state.wallet / state.currentSelected.price;
      }
    } else {
      let foundCount = state.currentHoldingArr.find((e) => {
        if (e.coinName === state.currentSelected.coinName) {
          return e.count;
        }
      });

      return foundCount ? foundCount.count : 0;
    }
  }

  let ref = useRef();

  return (
    <div className="pop-up">
      {state.currentSelected === null ? (
        ""
      ) : (
        <>
          <div className="header">
            <h4>
              {selected === "sell" ? "Sell" : "Buy"} {state.currentSelected.coinName}
            </h4>
            <h4 onClick={() => dispatch({ type: "popUp-toggle" })} style={{ cursor: "pointer" }}>
              ☓
            </h4>
          </div>

          <p>current Price:${state.currentSelected.price}</p>

          {/* <div className="input-container"> */}
          <input ref={ref} type="number" name="input" id="input" onChange={() => setInputValue(ref.current.value)} required />
          <label
            htmlFor="input"
            style={{ overflow: "hidden" }}
            onClick={() => {
              ref.current.value = getMaxValue();
              setInputValue(ref.current.value);
            }}
          >
            Max {getMaxValue()}
          </label>
          {/* </div> */}

          <div className="buy-sell">
            <div>
              <input
                type="radio"
                name="radio-btn"
                id="btn1"
                checked={selected === "buy" ? true : false}
                onClick={() => {
                  // if(maxValue < ref.current.value) setSelected(null)
                  setSelected("buy");
                }}
              />
              <label htmlFor="btn1">Buy</label>
            </div>

            <div>
              <input
                type="radio"
                name="radio-btn"
                id="btn2"
                checked={selected === "buy" ? false : true}
                onClick={() => {
                  state.currentHoldingArr.map((e) => {
                    setSelected("sell");
                  });
                }}
              />
              <label htmlFor="btn2">Sell</label>
            </div>
          </div>

          <button
            onClick={() => {
              console.log("outside buy/sell button working");
              console.log(state.transactionArr.find((ele) => ele.coinName === state.currentSelected.coinName));
              if (state.transactionArr.find((ele) => ele.coinName === state.currentSelected.coinName) || selected === "buy") {
                console.log("inside buy/sell button working");
                dispatch({ type: selected, payload: { coinName: state.currentSelected.coinName, price: state.currentSelected.price, time: new Date().toLocaleString(), count: inputValue, typeofTransaction: selected } });
                dispatch({ type: "popUp-toggle" });
              }
            }}
          >
            {selected === "sell" ? "Sell" : "Buy"}
          </button>
        </>
      )}
    </div>
  );
}

export default Popup;
