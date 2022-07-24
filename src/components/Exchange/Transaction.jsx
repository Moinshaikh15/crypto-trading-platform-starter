import { useContext } from "react";
import "./TranStyle.css";
import TransactionCard from "./TransactionCard";

import coinData from "../../contexts/coinData";
export default function Transaction() {
    let { state, dispatch } = useContext(coinData);
    return <div className="Tarnsaction-container">
        <h2>Transaction</h2>
        {
            state.transactionArr.map((e) => {
                console.log(e,'kk')
                return <TransactionCard name={e.coinName} price={e.price} time={e.time} count={e.count} type={e.typeofTransaction}/>
            })
        }


    </div>
  
}
