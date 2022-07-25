import { useContext } from "react";
import coinData from "../../contexts/coinData";
export default function TransactionCard(props) {
  let { state } = useContext(coinData);
  let name = state.coinsInfo[props.name.toLowerCase()];
  return (
    <div className="tran-Card">
      <div className="bar" style={{ backgroundColor: props.type === "buy" ? "green" : "red" }}>
        {props.type === "buy" ? <p>BOUGHT</p> : <p style={{ paddingLeft: "15px" }}>SOLD</p>}
      </div>
      <img src={name.src} alt="" />
      <h5>
        {props.name} - {props.count} @ ${props.price}
      </h5>
      <p>
        {props.type === "buy" ? "Paid" : "Received"}: ${props.price * props.count}
      </p>
      <p style={{fontSize:`12px`}}>Bought on {props.time}</p>
    </div>
  );
}
