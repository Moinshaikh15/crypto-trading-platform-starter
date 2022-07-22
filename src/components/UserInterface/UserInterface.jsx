import "./styles.css";
import { useReducer, useEffect, useState } from "react";
import coinData from "../../contexts/coinData";
import CoinsWindow from "../CoinsWindow/CoinsWindow";
import CurrentHolding from "../Exchange/CurrentHolding";
import Transaction from "../Exchange/Transaction";
import Popup from "../Popup/Popup";

const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20cardano%2C%20solana&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h";
function reducer(state, action) {
  switch (action.type) {
    case "buy":
      break;
    case "sell":
      break;
    case "dataUpdate":
      return { ...state, coinsInfo: action.payload };
<<<<<<< HEAD
=======

    case "popUp-toggle":
      console.log('yee')
      return { ...state, popupRef: !state.popupRef };

>>>>>>> 41a483d8e47f4612d4b5c60f75667b73cb28c6f4
    default:
      break;
  }
}

function UserInterface() {
<<<<<<< HEAD
  let [state, dispatch] = useReducer(reducer, { wallet: 100, portfoilio: [], coinNames: ["bitcoin", "ethereum", "cardano", "solana"], coinsInfo: false });
  let [popup, popupToggle] = useState(false);
=======
  let [state, dispatch] = useReducer(reducer, { wallet: 100, portfoilio: [], coinNames: ["bitcoin", "ethereum", "cardano", "solana"], coinsInfo: false, popupRef: false });
>>>>>>> 41a483d8e47f4612d4b5c60f75667b73cb28c6f4

  async function getData() {
    console.log("ping");
    let response = await fetch(URL).catch((error) => {
      console.log(error);
    });
    let data = await response.json();

    let output = {};
    for (const obj of data) {
      output[obj.name.toLowerCase()] = { name: obj.name, price: obj.current_price, change24Per: Number(obj.price_change_percentage_24h).toFixed(5), src: obj.image };
    }

    dispatch({ type: "dataUpdate", payload: output });
  }

  useEffect(() => {
    const getInterval = setInterval(() => {
      getData();
    }, 5000);

    return () => {
      clearInterval(getInterval);
    };
  }, []);

  console.log(state.coinsInfo);
  function togglePopup(status) {
    !status ? popupToggle(true) : popupToggle(false);
  }

  return (
    <div id="container">
      <div id="appHeader">
        <div id="header1">Earn some virtual money 💰</div>
        <div id="header2">To buy virtual food</div>
        <div id="header3">Wallet: ${state.wallet}</div>
        <div id="header4">Portfolio Value: ${"currentValueOfCoinsIHave"}</div>
      </div>

      <button style={{ height: "50px", width: "50px" }} onClick={() => console.log("pingPong")}></button>

      <div className="main-container">
        {state.coinsInfo ? (
          <coinData.Provider value={{ state, dispatch }}>
            <CoinsWindow />

            <div className="Exchange-container">
              <CurrentHolding />
              <Transaction />
            </div>
<<<<<<< HEAD
            <div className="popUp-container">
              <Popup />
=======
            <div className={state.popupRef?'show-popup':"popUp-container"}>
              <Popup  />
>>>>>>> 41a483d8e47f4612d4b5c60f75667b73cb28c6f4
            </div>
          </coinData.Provider>
        ) : (
          <div>"Fetching..."</div>
        )}
      </div>
    </div>
  );
}

export default UserInterface;
