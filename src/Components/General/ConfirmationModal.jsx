import './ConfirmationModal.css';
import Button from "./Button";

export function ConfirmationModal ({ onConfirm, onCancel, message, displayPasswordModal }) {

    console.log('ConfirmationModal', displayPasswordModal);
    return (
        <>
            <div id="cancel-modal" className={`modal ${displayPasswordModal ? 'modalShown' : ''}`}>
                <div className="modal-content">
                    <p>{message}</p>
                    <Button text="Confirm" onClick={onConfirm} />
                    <Button text="Cancel" onClick={onCancel} />
                </div>
            </div>
        </>
    );
}
