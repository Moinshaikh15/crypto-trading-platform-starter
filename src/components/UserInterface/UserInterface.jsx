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
      let newWallet = state.wallet - action.payload.price * action.payload.count;
      let copyArr = [...state.currentHoldingArr];
      if (copyArr.length === 0) {
        copyArr.push(JSON.parse(JSON.stringify(action.payload)));
      } else {
        let found = false;
        for (let i = 0; i < copyArr.length; i++) {
          if (copyArr[i].coinName === action.payload.coinName) {
            copyArr[i].count = Number(copyArr[i].count) + Number(action.payload.count);
            found = true;
          }
        }
        if (found === false) {
          copyArr.push(JSON.parse(JSON.stringify(action.payload)));
        }
      }

      return { ...state, transactionArr: [...state.transactionArr, JSON.parse(JSON.stringify(action.payload))], currentHoldingArr: copyArr, wallet: newWallet };

    case "sell":
      let newWallet2 = state.wallet + action.payload.price * action.payload.count;

      let currHoldCopy = [...state.currentHoldingArr].map((e) => (e.coinName === action.payload.coinName ? { ...e, count: e.count - action.payload.count } : e));
      currHoldCopy = currHoldCopy.filter((ele) => ele.count > 0);
      return { ...state, currentHoldingArr: currHoldCopy, transactionArr: [...state.transactionArr, JSON.parse(JSON.stringify(action.payload))], wallet: newWallet2 };

    case "dataUpdate":
      let newPorfolio = 0;
      let copyArr3 = state.currentHoldingArr;
      copyArr3.map((e) => (newPorfolio += e.count * state.coinsInfo[e.coinName.toLowerCase()].price));
      return { ...state, coinsInfo: action.payload, portfolio: newPorfolio };
    case "popUp-toggle":
      let copyRef = !state.popupRef;
      return { ...state, popupRef: copyRef };
    case "UpdateSelected":
      return { ...state, currentSelected: JSON.parse(JSON.stringify(action.payload)) };
    case 'update-selected':
      return { ...state, selected: action.payload }
    case 'update-inputValue':
      return { ...state, inputValue: action.payload }
    default:
      return { ...state };
  }
}

function UserInterface() {
  let [state, dispatch] = useReducer(reducer, { wallet: 100, portfolio: 0, coinNames: ["bitcoin", "ethereum", "cardano", "solana"], coinsInfo: false, popupRef: false, currentSelected: null, transactionArr: [], currentHoldingArr: [], selected: 'buy', inputValue: '' });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(state.coinsInfo);

  return (
    <div id="container">
      <div id="appHeader">
        <div id="header1">
          <img id="acmeLogo" src="/images/logo.svg" alt="ACME Logo" /> ACME
        </div>
        <div id="header2">Paper Cryptocurrency Trading Platform</div>
        <div id="header3">
          <img id="walletIcon" src="/images/wallet.svg" alt="Wallet Icon" /> Wallet: ${state.wallet}
        </div>
        <div id="header4">
          <img id="portfolioIcon" src="/images/portfolio.png" alt="Portfolio Icon" />
          Portfolio Value: ${state.portfolio}
        </div>
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
