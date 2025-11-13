import { useContext, useEffect, useRef } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {

    const cartCtx = useContext(CartContext);
    const userPrgCtx = useContext(UserProgressContext);

     const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function closeCheckoutHandler() {
        userPrgCtx.closeCheckout();
    }
    

    return (
        <Modal open={userPrgCtx.userProgress === 'checkout'}>
            <h2>Checkout</h2>
            <p>Total Amount: {totalPrice}</p>
            <div>
                <form>
                    <Input id="fullname" name="fullname" label="Full Name" required />
                    <Input id="email" type="email" name="email" label="E-Mail Address" required />
                    <Input id="street" name="street" label="Street" type="text" required />
                    <div className="control-row">
                        <Input id="postal_code" label="Postal Code" name="postal_code" id="postal_code" type="text" required />
                        <Input id="city" name="city" label="City"  type="text" required />
                    </div>
                    <div className="modal-actions">
                        <Button textOnly onClick={closeCheckoutHandler}>Close</Button>
                        <Button>Submit Order</Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}