import { createContext, useState } from "react";

const UserProgressContext = createContext({
    userProgress: '',
    openCart: () => { },
    closeCart: () => { },
    openCheckout: () => { },
    closeCheckout: () => { }
})

export function UserProgressContextProvider({children}) {

    const [progress, setProgress] = useState('');

    function openCart() {
        setProgress('cart')
    }

    function closeCart() {
        setProgress('');
    }

    function openCheckout() {
        setProgress('checkout');
    }

    function closeCheckout() {
        setProgress('');
    }

    const userProgressCtx = {
        userProgress: progress,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout
    }

    return (
        <UserProgressContext.Provider value={userProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext;