import './currStyle.css'
import CurrHoldingCard from "./CurrHoldingCard"
export default function CurrentHolding() {

    return <div className="currholding-container">
        <h2>Current Holdings</h2>
        <div>
            < CurrHoldingCard />
        </div>
    </div>


}