import './Modal.css';

function Modal(props) {
    return (
        <div >
            <div className='Modal'>
                <button className='Modal__close-button' onClick={() => props.toggleVisibility()}>x</button>
                {props.children}
             </div>
        </div>
    )
}

export default Modal;
