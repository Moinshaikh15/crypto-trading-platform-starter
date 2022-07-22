import "./styles.css";
import { useContext } from "react";
import coinData from "../../contexts/coinData";

function CoinCard(props) {
  let coinDataContext = useContext(coinData);
  return (
    <div className="coinCard" onClick={()=>{
      console.log('lll')
    return  coinDataContext.dispatch({type:'popUp-toggle'})}}>
      {console.log(coinDataContext.state.popupRef)}
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
