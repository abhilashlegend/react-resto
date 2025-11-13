import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {

    const cartCtx = useContext(CartContext);
    const userPrgCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalItem, item) => {
        return totalItem + item.quantity;
    }, 0)

    function handleOpenCart() {
        userPrgCtx.openCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt='App logo' />
                <h1>React Resto</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleOpenCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}