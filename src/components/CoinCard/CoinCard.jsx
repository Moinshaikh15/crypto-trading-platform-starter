import "./styles.css";

function CoinCard(props) {
  return (
    <div className="coinCard">
      <img className="coinCardThumb" src={props.coinInfo[1].src} alt={`${props.coinInfo[1].name} Icon`} />
      <div className="coinCardInfo">
        <div className="coinCardPrice">${props.coinInfo[1].price}</div>
        <div className="coinCardName">{props.coinInfo[1].name}</div>
        <div className="coinCardChange">{props.coinInfo[1].change24Per}</div>
      </div>
    </div>
  );
}

export default CoinCard;
