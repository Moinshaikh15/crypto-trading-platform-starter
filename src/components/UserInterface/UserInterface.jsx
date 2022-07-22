import "./styles.css";
import { useReducer } from "react/cjs/react.production.min";
import coinData from "../../contexts/coinData";

function reducer(state, action) {
  switch (action.type) {
    case "buy":
      break;
    case "sell":
      break;
  }
}

function UserInterface() {
  let [state, dispatch] = useReducer(reducer, { wallet: 100, portfoilio: [], coinInfo: [] });

  return (
    <div id="container">
      <div id="appHeader">
        <div id="header1">Earn some virtual money</div>
        <div id="header2">To buy virtual food</div>
        <div id="header3">Wallet: ${"currentAmountInWallet"}</div>
        <div id="header4">Portfolio Value: ${"currentValueOfCoinsIHave"}</div>
        {}
      </div>
    </div>
  );
}

export default UserInterface;
