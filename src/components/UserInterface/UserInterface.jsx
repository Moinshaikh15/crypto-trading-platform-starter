import "./styles.css";
import { useReducer } from "react";
import coinData from "../../contexts/coinData";
import CoinsWindow from "../CoinsWindow/CoinsWindow";
import CurruntHolding from "../Exchange/CurrentHolding";
import Transaction from "../Exchange/Transaction";
function reducer(state, action) {
  switch (action.type) {
    case "buy":
      break;
    case "sell":
      break;
  }
}

function UserInterface() {
  let [state, dispatch] = useReducer(reducer, { wallet: 100, portfoilio: [], coinInfo: false });

  return (
    <div id="container">
      <div id="appHeader">
        <div id="header1">Earn some virtual money 💰</div>
        <div id="header2">To buy virtual food</div>
        <div id="header3">Wallet: ${state.wallet}</div>
        <div id="header4">Portfolio Value: ${"currentValueOfCoinsIHave"}</div>
      </div>
      <div className="main-container">


        {state.coinInfo ? (
          <div>"Fetching..."</div>
        ) : (
          <coinData.Provider value={{ state, dispatch }}>
            <CoinsWindow />


            <div className="Exchange-container">
              <CurruntHolding />
              <Transaction />
            </div>

          </coinData.Provider>
        )}








      </div>
    </div>
  );
}

export default UserInterface;
