export default function TransactionCard(props) {
  return (
    <div className="tran-Card">
      <div className="bar">
        <p>BOUGHT</p>
      </div>
      <h5>
        {props.name}-{props.count}@${props.price}
      </h5>
      <p>Paid:${props.price * props.count}</p>
      <p>Bought on {props.time}</p>
    </div>
  );
}
