import '../styles/Modal.css';

function Modal(props) {
    return (
        <div >
            <div className='Modal'>
                <button className='Modal__close-button' onClick={() => props.toggleVisibility()}>x</button>
                <div className='Modal__content'>
                    {props.children}
                </div>
             </div>
        </div>
    )
}

export default Modal;
