import { currencyFormatter } from "../util/formatting";

export default function CartItem({name, quantity, price, onIncrease, onDecrease}) {
    return (
        <div className="cart-item">
            <p>
                {name} - {quantity} X { currencyFormatter.format(price) }
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}> - </button>
                {quantity}
                <button onClick={onIncrease}> + </button>
            </p>
        </div>
    )
}