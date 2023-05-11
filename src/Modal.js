import './Modal.css';
import Draggable from 'react-draggable';

function Modal(props) {
    return (
        <div >
            <Draggable>
                <div className='Modal'>
                    <button className='Modal__close-button' onClick={() => props.toggleVisibility()}>x</button>
                    {props.children}
                </div>
            </Draggable>
        </div>
    )
}

export default Modal;
