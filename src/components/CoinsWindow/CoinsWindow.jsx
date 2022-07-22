import "./styles.css";
import { useContext } from "react";
import coinData from "../../contexts/coinData";
import CoinCard from "../CoinCard/CoinCard";

function CoinsWindow(props) {
  let coinDataContext = useContext(coinData);

  return (
    <>
      <div id="coinsWindow">{coinDataContext.state.coinsInfo ? Object.entries(coinDataContext.state.coinsInfo).map((ele, idx) => <CoinCard coinInfo={ele} index={idx} />) : null}</div>
    </>
  );
}

export default CoinsWindow;
