import React, {FC} from "react";
import {Action} from "pages/card/cardReducer";
import './modal.css'
interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
    dispatch: React.Dispatch<Action>
}
const Modal: FC<ModalProps> = ({ show, onClose, children, dispatch }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;