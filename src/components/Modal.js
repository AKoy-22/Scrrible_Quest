import classes from './css/Modal.module.css';

function Modal({children, hideModalHander}){

    return(
        <>
        <div className={classes.backdrop} onClick={hideModalHander}>
            <dialog open className={classes.modal}>
                {children}
            </dialog>
        </div>
        </>
    )
}

export default Modal;