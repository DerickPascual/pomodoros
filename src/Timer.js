import './Timer.css'
import Draggable from 'react-draggable';
import { useState } from 'react';

function Timer({workLen, shortBreakLen, longBreakLen}) {
    const [drag, setDrag] = useState(false);

    const handleDrag = () =>{
        setDrag(!drag);
    }

    console.log(drag)
    return (
    <div className='Timer'>
            <div className='Timer__countdown-container'>
                <Draggable
                onStart={handleDrag}
                onStop={handleDrag}
                handle='strong'
                >
                    <div style={{
                        width: 'fit-content',
                        padding: '10px',
                        height: 'fit-content',
                        outline: drag ? '1px solid rgb(255, 238, 0)' : 'none',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <strong style={{opacity: '0'}}>click to drag</strong>
                        <p style={{padding: '0px', margin: '0px'}}>25:00</p>
                        <button>pause</button>
                        <button>skip</button>
                    </div>
                </ Draggable >
            </div>
    </div>
    )
}

export default Timer;