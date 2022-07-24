import "./styles.css";
import { useReducer, useEffect } from "react";
import coinData from "../../contexts/coinData";
import CoinsWindow from "../CoinsWindow/CoinsWindow";
import CurrentHolding from "../Exchange/CurrentHolding";
import Transaction from "../Exchange/Transaction";
import Popup from "../Popup/Popup";

function reducer(state, action) {
  switch (action.type) {
    case "buy":
      let newWallet = state.wallet
      newWallet -= (action.payload.price * action.payload.count)
      let newPorfolio = state.portfoilio
      newPorfolio += (action.payload.price * action.payload.count)
      let copyArr = state.transactionArr


      let transArrCopy1 = state.transactionArr
      transArrCopy1.push(JSON.parse(JSON.stringify(action.payload)))

      let currArrCopy = state.currentHoldingArr
      currArrCopy.push(action.payload)
      return { ...state, transactionArr: transArrCopy1, currentHoldingArr: currArrCopy, wallet: newWallet, portfoilio: newPorfolio }


    case "sell":
      let currArrCopy2 = state.currentHoldingArr
      currArrCopy2.map((e) => {
        if (e.coinNames === action.payload.coinNames) {
          e.count -= action.payload.count
        }
      })
      for (let i = 0; i < currArrCopy2.length; i++) {
        if (currArrCopy2[i].count <= 0) {
          currArrCopy2.splice(i, 1);
          i--;
        }
      }

      let transArrCopy = state.transactionArr
      transArrCopy.push(action.payload)

      return { ...state, currentHoldingArr: currArrCopy2, transactionArr: transArrCopy }

    case "dataUpdate":
      console.log(state.coinsInfo, 'ppp')
      return { ...state, coinsInfo: action.payload };

    case "popUp-toggle":
      // console.log(state.popupRef, 'ooo')
      let copyRef = !state.popupRef;
      return { ...state, popupRef: copyRef };

    case "UpdateSelcted":
      let copySelected = action.payload;
      return { ...state, currentSelected: copySelected };

    default:
      return { ...state };
  }
}

function UserInterface() {
  let [state, dispatch] = useReducer(reducer, { wallet: 100, portfoilio: 0, coinNames: ["bitcoin", "ethereum", "cardano", "solana"], coinsInfo: false, popupRef: false, currentSelected: null, transactionArr: [], currentHoldingArr: [] });

  async function getData() {
    console.log("ping");

    let URLarr = ["https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=", "&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"];
    state.coinNames.forEach((ele, idx) => (idx !== state.coinNames.length - 1 ? URLarr.splice(idx + 1, 0, ele + "%2C%20") : URLarr.splice(idx + 1, 0, ele)));
    let URL = URLarr.join("");

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

  // console.log(state.coinsInfo);

  return (
    <div id="container">
      <div id="appHeader">
        <div id="header1">Earn some virtual money 💰</div>
        <div id="header2">To buy virtual food</div>
        <div id="header3">Wallet: ${state.wallet}</div>
        <div id="header4">Portfolio Value: ${state.portfoilio}</div>
      </div>

      <div id="main-container">
        {state.coinsInfo ? (
          <coinData.Provider value={{ state, dispatch }}>
            <CoinsWindow />

            <div id="exchange-container">
              <CurrentHolding />
              <Transaction />
            </div>
            <div className={state.popupRef === true ? "popUp-container, show-popup" : "popUp-container"}>
              <Popup />
            </div>
          </coinData.Provider>
        ) : (
          <div id="loadingScreen">"Fetching..."</div>
        )}
      </div>
    </div>
  );
}

export default UserInterface;
