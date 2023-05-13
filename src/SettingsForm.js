import { useState } from 'react';
import './Form.css';

function SettingsForm({workLen, setWorkLen, shortBreakLen, setShortBreakLen, longBreakLen, setLongBreakLen}) {

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

    const handleWorkChange = (e) => {
        setWorkLen(e.target.value);
    }

    const handleShortChange = (e) => {
        setShortBreakLen(e.target.value);
    }

    const handleLongChange = (e) => {
        setLongBreakLen(e.target.value);
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
            </form>

        </div>
    )
}

export default SettingsForm;