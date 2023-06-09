import { useState, useEffect } from 'react';
import '../styles/Form.css';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import useSound from 'use-sound';
import timerSfx from '../sounds/minecraft_level_up.mp3';
import { signOut } from "firebase/auth";

// definitely will need to break this function up 
function SettingsForm({workLen, setWorkLen, shortBreakLen, setShortBreakLen, longBreakLen, setLongBreakLen, currentPeriod, setCurrentPeriod, longBrInterval, setLongBrInterval, loggedIn, showStats, setShowStats, statsPosition, setStatsPosition, timerPosition, setTimerPosition, setStatsType, statsType, userId, volume, setVolume, showIntButtons, setShowIntButtons}) {
    
    const [goodSync, setGoodSync] = useState(false);

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

    const handleResetStatsPos = (e) => {
        e.preventDefault()
        setStatsPosition({x: 0, y: 0});
    }

    const handleResetTimerPos = (e) => {
        e.preventDefault()
        setTimerPosition({x: 0, y: 0});
    }

    const handleStatsType = (e) => {
        setStatsType(e.target.value);
    }

    const handleSync = async (e) => {
        e.preventDefault();

        const userRef = doc(db, 'users', userId);

        await setDoc(userRef, {
            shortBreakLen: shortBreakLen,
            longBreakLen: longBreakLen,
            workLen: workLen,
            longBrInterval: longBrInterval,
            statsType: statsType,
            volume: volume,
            showIntButtons: showIntButtons,
            showStats: showStats
        }, { merge: true });

        setGoodSync(true);
    }

    const handleVol = (e) => {
        e.preventDefault();
        setVolume(e.target.value);
    }

    const [play] = useSound(timerSfx, { volume: (volume * 1/100)})

    const handleIntButtonsVis = (e) => {
        e.preventDefault()
        setShowIntButtons(!showIntButtons);
    }

    const handleSignOut = (e) => {
        e.preventDefault()

        signOut(auth).then(() => {

        }).catch((error) => {

        })
    }

    const toggleStats = (e) => {
        e.preventDefault();
        setShowStats(!showStats);
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
                <p>---------------------</p>
                <label>long break interval</label>
                <div>
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
                </div>
                <div style={{textAlign: 'center'}}>
                        { showIntButtons ? 
                            <button className='Form__button' onClick={handleIntButtonsVis} style={{fontSize: 'small'}}>hide set interval buttons</button>
                            :
                            <button className='Form__button' onClick={handleIntButtonsVis} style={{fontSize: 'small'}}>unhide set interval buttons</button>
                        }
                </div>
                <p>---------------------</p>
                <div className='Form__volume-container'>
                    <label htmlFor='volume'>timer volume</label>
                    <br></br>
                    <input 
                        className='Form__slider'
                        name='volume'
                        type='range'
                        min='0'
                        max='100'
                        value={volume}
                        onChange={handleVol}
                        onMouseUp={() => play()}
                    />
                    <button className='Form__reset-button' onClick={handleResetTimerPos}>reset timer position</button>
                </div>
                <div className='Form__reset-button-container'>
                    {
                        loggedIn && 
                        <div>
                            <p>---------------------</p>
                            <label htmlFor='stats-type'>stats type</label>
                            <select name='stats-type' className='Form__select' value={statsType} onChange={handleStatsType} >
                                <option value='alltime'>alltime</option>
                                <option value='session'>session</option>
                            </select>
                            <button className='Form__button' style={{fontSize: 'small'}} onClick={toggleStats}>
                            {showStats && 
                                <>hide  stats</>
                            }
                            {!showStats &&
                                <>show stats</>
                            }
                        </button>
                            <button className='Form__reset-button' onClick={handleResetStatsPos}>reset stats position</button>
                        </div>
                    }
                </div>
                {
                    loggedIn && (
                        <div>
                            <p>---------------------</p>
                            <div className='Form__save-button-container'>
                                <button className='Form__button' style={{fontSize: 'small'}}onClick={handleSync}>save changes to account</button>
                            </div>
                            {goodSync && <div className='Form__success'>settings saved</div>}
                            <div style={{textAlign: 'center'}}>
                                <p>---------------------</p>
                                <button className='Form__button' style={{fontSize: 'small'}}onClick={handleSignOut}>sign out</button>
                            </div>
                        </div>
                    )
                }
            </form>
        </div>
    )
}

export default SettingsForm;