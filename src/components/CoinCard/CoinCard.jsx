import "./styles.css";
import { useContext } from "react";
import coinData from "../../contexts/coinData";

function CoinCard(props) {
  let coinDataContext = useContext(coinData);
  return (
    <div className="coinCard" onClick={() => {
      coinDataContext.dispatch({ type: 'UpdateSelcted', payload: { price: props.coinInfo[1].price, coinName: props.coinInfo[1].name } });
      coinDataContext.dispatch({ type: 'popUp-toggle' })
    }}>

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
