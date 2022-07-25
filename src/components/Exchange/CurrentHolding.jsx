import "./currStyle.css";
import CurrHoldingCard from "./CurrHoldingCard";
import { useContext } from "react";
import coinData from "../../contexts/coinData";
export default function CurrentHolding() {
  let { state } = useContext(coinData);

  return (
    <div className="currholding-container">
      <h3 style={{  fontFamily: "Squada One"}}>Current Holdings</h3>
      <div className="currholding-cardscontainer">
        {state.currentHoldingArr.length===0?
        <p>Go Buy Something 🚀</p>
        : state.currentHoldingArr.map((e) => {
          return <CurrHoldingCard name={e.coinName} price={e.price} count={e.count} />;
        })}
      </div>
    </div>
  );
}
