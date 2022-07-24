import { useContext } from "react";
import "./TranStyle.css";
import TransactionCard from "./TransactionCard";

import coinData from "../../contexts/coinData";
export default function Transaction() {
    let { state } = useContext(coinData);
    return (
        <div className="Tarnsaction-container">
            <h2 style={{  fontFamily: "Squada One"}}>Transaction</h2>
            <div className="TranCard-container">

                {
                state.transactionArr.length===0?
                 <p>No Transactions Yet...</p>
                :state.transactionArr.map((e) => {
                    return <TransactionCard name={e.coinName} price={e.price} time={e.time} count={e.count} type={e.typeofTransaction} />;
                })}
            </div>
        </div>
    );
}
