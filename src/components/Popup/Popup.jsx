import "./styles.css";
import { useContext, useRef } from "react";
import coinData from "../../contexts/coinData";

function Popup() {
  let { state, dispatch } = useContext(coinData);
  let selected = state.selected
  let inputValue = state.inputValue



  function getMaxValue() {
    if (selected === "buy") {
      return state.wallet !== 0 ? state.wallet / state.currentSelected.price : 0;
    } else {
      let foundCount = state.currentHoldingArr.find((e) => {
        if (e.coinName === state.currentSelected.coinName) {
          return e.count;
        }
        return e
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
            <h4 onClick={() => {
              dispatch({ type: "popUp-toggle" })
              ref.current.value = '';
              dispatch({ type: 'update-selected', payload: 'buy' })

            }} style={{ cursor: "pointer" }}>
              ☓
            </h4>
          </div>

          <p>Current Price:${state.currentSelected.price}</p>

          <div className="input-container">
            <input ref={ref} type="number" name="input" id="input" onChange={() => dispatch({ type: 'update-inputValue', payload: ref.current.value })} required />
            {inputValue !== undefined ? <p>You will {selected === 'buy' ? 'Pay' : 'Receive'} {state.currentSelected.price * inputValue}</p> : ''}

            <label
              htmlFor="input"
              onClick={() => {
                ref.current.value = getMaxValue();
                dispatch({ type: 'update-inputValue', payload: ref.current.value })
              }}
            >
              Max {getMaxValue()}
            </label>

          </div>

          <div className="buy-sell">
            <div>
              <input
                type="radio"
                name="radio-btn"
                id="btn1"
                checked={selected === "buy" ? true : false}
                onClick={() => {
                  dispatch({ type: 'update-selected', payload: 'buy' })
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
                  dispatch({ type: 'update-selected', payload: 'sell' })
                }}
              />
              <label htmlFor="btn2">Sell</label>
            </div>
          </div>

          <button style={{ opacity: (inputValue <= getMaxValue() && 0 !== getMaxValue()) ? '1' : '0.5' }}
            onClick={() => {
              if (((state.transactionArr.find((ele) => ele.coinName === state.currentSelected.coinName) && inputValue <= getMaxValue()) || (selected === "buy" && state.wallet >= inputValue * state.currentSelected.price)) && getMaxValue() !== 0) {
                dispatch({ type: selected, payload: { coinName: state.currentSelected.coinName, price: state.currentSelected.price, time: new Date().toLocaleString(), count: inputValue, typeofTransaction: selected } });
                dispatch({ type: "popUp-toggle" });
              }
              ref.current.value = '';
            }}
          >
            {selected === "sell" ? "SELL" : "BUY"}
          </button>
        </>
      )}
    </div>
  );
}

export default Popup;
