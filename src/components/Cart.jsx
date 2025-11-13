import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import CartItem from "./CartItem";

export default function Cart() {

    const cartCtx = useContext(CartContext);
    const userPrgCtx = useContext(UserProgressContext);

    const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function handleCloseCart() {
        userPrgCtx.closeCart();
    }

    function handleOpenCheckout() {
        userPrgCtx.openCheckout();
    }

    return (
        <Modal className="cart" open={userPrgCtx.userProgress === 'cart'} onClose={userPrgCtx.userProgress === 'cart' ? handleCloseCart : null} >
            <h2>Your Cart</h2>

            <ul>
                { cartCtx.items.map(item => {
                    return (
                        <CartItem key={item.id} name={item.name} price={item.price} quantity={item.quantity} onDecrease={() => cartCtx.removeItem(item.id)} onIncrease={() => cartCtx.addItem(item)} />
                    )
                })}
            </ul>
            <div className="cart-total">
                Total: { currencyFormatter.format(totalPrice) }
            </div>
            <div className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleOpenCheckout}>Go to Checkout</Button> }
            </div>
        </Modal>
    )
}