import "./currStyle.css";
import CurrHoldingCard from "./CurrHoldingCard";
import { useContext } from "react";
import coinData from "../../contexts/coinData";
export default function CurrentHolding() {
  let { state } = useContext(coinData);

  return (
    <div className="currholding-container">
      <h2>Current Holdings</h2>
      <div>
        {state.currentHoldingArr.map((e) => {
          return <CurrHoldingCard name={e.currentSelected.coinName} price={e.currentSelected.price} count={e.count} />;
        })}
      </div>
    </div>
  );
}
