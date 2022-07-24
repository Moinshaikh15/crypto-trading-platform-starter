import "./styles.css";
import { useContext, useRef, useState } from "react";
import coinData from "../../contexts/coinData";

function Popup(props) {
  let { state, dispatch } = useContext(coinData);

  let [selected, setSelected] = useState(null);
  let [inputValue, setInputValue] = useState();
  let maxValue = selected === 'buy' ? Math.round(state.wallet / state.currentSelected.price) : (selected === null ? 0 : (state.currentHoldingArr.map((e) => {
    if (e.coinName === state.currentSelected.coinName) {
      return e.count
    }
  }))
  )

  let ref = useRef()

  return (
    <div className="pop-up">
      {
        state.currentSelected === null ? '' :
          <>
            <div className="header">
              <h4>Buy {state.currentSelected.coinName}</h4>
              <h4 onClick={() => dispatch({ type: 'popUp-toggle' })} style={{ cursor: 'pointer' }}>☓</h4>
            </div>

            <p>current Price:${state.currentSelected.price}</p>

            <div className="input-container">
              <input ref={ref} type="number" name="input" id="input" onChange={() => setInputValue(ref.current.value)} required />
              <label htmlFor="input" style={{ overflow: 'hidden' }} onClick={() => ref.current.value = maxValue}
              >Max {maxValue}
              </label>
            </div>

            <div className="buy-sell">
              <div>
                <input type="radio" name="radio-btn" id="btn1" onClick={() => {
                  setSelected('buy')
                }} />
                <label htmlFor="btn1">Buy</label>
              </div>

              <div>
                <input type="radio" name="radio-btn" id="btn2" onClick={() => {
                  state.currentHoldingArr.map((e) => {
                    if (e.coinName === state.currentSelected.coinName) {
                      setSelected('sell')
                    }
                  })
                  if (selected === null) {

                  }

                }} />
                <label htmlFor="btn2">Sell</label>
              </div>

            </div>


            <button onClick={() => {
              if (selected !== null) {
                dispatch({ type: selected, payload: { coinName: state.currentSelected.coinName, price: state.currentSelected.price, time: Date.now(), count: inputValue, typeofTransaction: selected } })
                dispatch({ type: 'popUp-toggle' })
              }
            }}>{selected === 'sell' ? 'Sell' : 'Buy'}</button>
          </>
      }
    </div >
  );
}

export default Popup;
