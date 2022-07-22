import "./styles.css";
import { useContext } from "react";
import coinData from "../../contexts/coinData";

function CoinsWindow() {
  let coinDataContext = useContext(coinData);

  return (
    <>
      <div className="coinsWindow">dasdasd{"getData()"}</div>
    </>
  );
}

export default CoinsWindow;
