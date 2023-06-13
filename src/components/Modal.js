import classes from './css/Modal.module.css';

function Modal({children, hideModalHander}){

    return(
        <>
        <div className={classes.backdrop} >
            <dialog open className={classes.modal}>
            <span className={classes.closeBtn} onClick={hideModalHander}>&times;</span>
                {children}
            </dialog>
        </div>
        </>
    )
}

export default Modal;