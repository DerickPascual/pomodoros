import { useState } from 'react';
import './Form.css';

function SettingsForm({workLen, setWorkLen, shortBreakLen, setShortBreakLen, longBreakLen, setLongBreakLen, currentPeriod, setCurrentPeriod, longBrInterval, setLongBrInterval}) {

    const [shortIsFocused, setShortIsFocused] = useState(false);

    const handleShortFocusBlur = () => {
        setShortIsFocused(!shortIsFocused);
    }

    const [longIsFocused, setLongIsFocused] = useState(false);

    const handleLongFocusBlur = () => {
        setLongIsFocused(!longIsFocused);
    }

    const [workIsFocused, setWorkIsFocused] = useState(false);

    const handleWorkFocusBlur = () => {
        setWorkIsFocused(!workIsFocused);
    }

    const [longBrIntervalFocused, setLongBrIntervalFocused] = useState(false);

    const handleLongBrIntervalFocusBlur = () => {
        setLongBrIntervalFocused(!longBrIntervalFocused)
    }

    const handleWorkChange = (e) => {
        setWorkLen(e.target.value);
    }

    const handleShortChange = (e) => {
        setShortBreakLen(e.target.value);
    }

    const handleLongChange = (e) => {
        setLongBreakLen(e.target.value);
    }

    const handleLongBrIntervalChange = (e) => {
        setLongBrInterval(e.target.value);
    }
    return (
        <div className='Form'>
            <form>
                <label>work length (minutes)</label>
                <input
                    className='Form__num-input'
                    type='number'
                    min='1'
                    onFocus={handleWorkFocusBlur}
                    onBlur={handleWorkFocusBlur}
                    style = {{
                        outline: workIsFocused ? '2px solid orange' : 'none'
                    }}
                    value={workLen}
                    onChange={handleWorkChange}
                    >
                </input>
                <label>short break length</label>
                <input
                    className='Form__num-input'
                    type='number'
                    min='1'
                    onFocus={handleShortFocusBlur}
                    onBlur={handleShortFocusBlur}
                    style = {{
                        outline: shortIsFocused ? '2px solid orange' : 'none'
                    }}
                    value={shortBreakLen}
                    onChange={handleShortChange}
                    >
                </input>
                <label>long break length</label>
                <input
                    className='Form__num-input'
                    type='number'
                    min='1'
                    onFocus={handleLongFocusBlur}
                    onBlur={handleLongFocusBlur}
                    style = {{
                        outline: longIsFocused ? '2px solid orange' : 'none'
                    }}
                    value={longBreakLen}
                    onChange={handleLongChange}
                    >
                </input>
                <label>long break interval</label>
                <input
                    className='Form__num-input'
                    type='number'
                    min='1'
                    onFocus={handleLongBrIntervalFocusBlur}
                    onBlur={handleLongBrIntervalFocusBlur}
                    style = {{
                        width: '20%',
                        outline: longBrIntervalFocused ? '2px solid orange' : 'none'
                    }}
                    value={longBrInterval}
                    onChange={handleLongBrIntervalChange}
                    >
                </input>
            </form>
            <p className='Form__hint'>hint: click the numbers on the timer to drag it!</p>
        </div>
    )
}

export default SettingsForm;