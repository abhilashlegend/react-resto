import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";

export default function Modal({children, open, className = '', onClose}){

    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if(open){
            modal.showModal();
        }
        return () => {
            modal.close();
        }
    }, [open])

    useEffect(() => {
        const modal = dialog.current;
        
        function handleCancel(event) {
            if (onClose) {
                event.preventDefault();
                onClose();
            }
        }
        
        modal.addEventListener('cancel', handleCancel);
        
        return () => {
            modal.removeEventListener('cancel', handleCancel);
        };
    }, [onClose])

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`}>
            {open && children}
        </dialog>,
        document.getElementById('modal')
    );
}