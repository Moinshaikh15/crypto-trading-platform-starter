import "./currStyle.css";
import CurrHoldingCard from "./CurrHoldingCard";
import { useContext } from "react";
import coinData from "../../contexts/coinData";
export default function CurrentHolding() {
  let { state } = useContext(coinData);

  return (
    <div className="currholding-container">
      <h2>Current Holdings</h2>
      <div className="currholding-cardscontainer">
        {state.currentHoldingArr.map((e) => {
          return <CurrHoldingCard name={e.coinName} price={e.price} count={e.count} />;
        })}
      </div>
    </div>
  );
}
