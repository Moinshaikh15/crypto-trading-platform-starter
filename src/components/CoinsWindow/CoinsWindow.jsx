import "./styles.css";
import { useContext } from "react";
import coinData from "../../contexts/coinData";
import CoinCard from "../CoinCard/CoinCard";

function CoinsWindow() {
  let { state, dispatch } = useContext(coinData);

  return (
    <>
      <div id="coinsWindow">{coinDataContext.state.coinsInfo ? Object.entries(coinDataContext.state.coinsInfo).map((ele) => <CoinCard coinInfo={ele} onclick={() => dispatch()} />) : null}</div>
    </>
  );
}

export default CoinsWindow;
