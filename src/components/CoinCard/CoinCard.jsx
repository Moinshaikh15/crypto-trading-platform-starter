import "./styles.css";
import { useContext } from "react";
import coinData from "../../contexts/coinData";

function CoinCard(props) {
  let coinDataContext = useContext(coinData);
  return (
    <div
      id={`coinCard${props.index + 1}`}
      className="coinCard"
      onClick={() => {
        coinDataContext.dispatch({ type: "UpdateSelected", payload: { price: props.coinInfo[1].price, coinName: props.coinInfo[1].name } });
        coinDataContext.dispatch({ type: "popUp-toggle" });
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      }}
    >
      <div className="outlineSymbol">
        <img className="coinCardThumb" src={props.coinInfo[1].src} alt={`${props.coinInfo[1].name} Icon`} />
      </div>
      <div className="coinCardInfo">
        {/* <div className="coinCardSymbol">{`${props.coinInfo[1].symbol}`}</div> */}
        <div className="coinCardChange" style={{ color: props.coinInfo[1].change24Per > 0 ? "rgb(0, 169, 8)" : "rgb(239, 0, 0)" }}>
          {props.coinInfo[1].change24Per > 0 ? `▴${props.coinInfo[1].change24Per}%` : `▾${props.coinInfo[1].change24Per.toString().slice(1)}%`}
        </div>
        <div className="coinCardName">{`${props.coinInfo[1].name} to USD`}</div>
      </div>
      <div className="coinCardPrice">${props.coinInfo[1].price.toString().length > 7 ? props.coinInfo[1].price.toString().slice(0, 7) : props.coinInfo[1].price}</div>
    </div>
  );
}

export default CoinCard;
