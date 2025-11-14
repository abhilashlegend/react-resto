import { useContext, useEffect, useRef } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    }
}

export default function Checkout() {

    const cartCtx = useContext(CartContext);
    const userPrgCtx = useContext(UserProgressContext);

     const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function closeCheckoutHandler() {
        userPrgCtx.closeCheckout();
    }

    function handleFinish() {
        userPrgCtx.closeCheckout();
        cartCtx.clearCart();
    }

    const { data, error, isLoading: isSending, sendRequest } = useHttp('http://localhost:3000/orders', requestConfig , [])

    function formSubmitHandler(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

       /* fetch('http://localhost:3000/orders', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        }) */

        sendRequest({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        })    

    }

    if(error){
        return <Error title="Error sending order" message={error} />
    }

    if(data.message && !error){
        return (<Modal open={userPrgCtx.userProgress === 'checkout'} onClose={handleFinish}>
            <h2>Thank you!</h2>
            <p>{data.message}.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>)
    } else {
         return (
        <Modal open={userPrgCtx.userProgress === 'checkout'}>
            <h2>Checkout</h2>
            <p>Total Amount: {totalPrice}</p>
            <div>
                <form onSubmit={formSubmitHandler}>
                    <Input id="name" name="name" label="Full Name" required />
                    <Input id="email" type="email" name="email" label="E-Mail Address" required />
                    <Input id="street" name="street" label="Street" type="text" required />
                    <div className="control-row">
                        <Input id="postal-code" label="Postal Code" name="postal-code" type="text" required />
                        <Input id="city" name="city" label="City"  type="text" required />
                    </div>
                    <div className="modal-actions">
                        <Button textOnly onClick={closeCheckoutHandler}>Close</Button>
                        { isSending ? <span>Sending data please wait...</span> : <Button>Submit Order</Button>}
                        
                    </div>
                </form>
            </div>
        </Modal>
        )
    }
    
    

   
}