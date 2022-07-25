import { useContext } from "react";
import coinData from "../../contexts/coinData";

export default function CurrHoldingCard(props) {
  let { state } = useContext(coinData);
  let name = state.coinsInfo[props.name.toLowerCase()];
  let profitLoss = name.price - props.price;
  return (
    <div className="curr-HoldingCard">
      <h5>
        {props.name}: {props.count}
      </h5>
      <p>
        Total Paid: ${props.price * props.count} , Current Value: ${name.price * props.count}
      </p>
      <p style={{ color: profitLoss < 0 ? "red" : "green", fontSize: "14px" }}>=
        P/L: ${profitLoss} {profitLoss > 0 ? "🚀" : "🔻"}
      </p>
    </div>
  );
}
