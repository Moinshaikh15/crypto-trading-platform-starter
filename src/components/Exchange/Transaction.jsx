import { useContext } from "react";
import "./TranStyle.css";
import TransactionCard from "./TransactionCard";

import coinData from "../../contexts/coinData";
export default function Transaction() {
  let { state, dispatch } = useContext(coinData);
  return (
    <div className="Tarnsaction-container">
      <h2>Transactions</h2>
      {state.transactionArr.map((e) => {
        console.log(e);
        return <TransactionCard name={e.currentSelected.coinName} price={e.currentSelected.price} time={e.time} count={e.count} />;
      })}
    </div>
  );
}
