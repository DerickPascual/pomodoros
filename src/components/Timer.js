import '../styles/Timer.css'
import Draggable from 'react-draggable';
import { useState, useEffect, useCallback} from 'react';
import useSound from 'use-sound';
import timerSfx from '../sounds/minecraft_level_up.mp3';
import * as workerTimers from 'worker-timers';

// given minutes, returns seconds to nearest second
const minutesToSeconds = (minutes) => {
    return Math.round(minutes * 60);
}

// function to calculate minutes left to display
const getDisplayMins = (seconds) => {
    let mins = Math.floor(seconds / 60);

    if (mins < 10) {
        return '0' + mins;
    }

    return mins.toString();
}

// function to calculate seconds left to display 
const getDisplaySecs = (seconds) => {
    let secs = Math.round(seconds % 60);

    if (secs < 10) {
        return '0' + secs;
    }

    return secs.toString();
}

function Timer({workLen, shortBreakLen, longBreakLen, currentPeriod, setCurrentPeriod, longBrInterval, timerPosition, setTimerPosition, loggedIn, totalTime, setTotalTime, timeStudied, setTimeStudied, timeOnBreak, setTimeOnBreak, volume}) {
    const [drag, setDrag] = useState(false);
    const [paused, setPaused] = useState(true);
    const [worksDone, setWorksDone] = useState(1);
    const[remaining, setRemaining] = useState();
    const [elapsed, setElapsed] = useState(0);
    // state to store the amount of time in seconds the timer should start at
    const [startVal, setStartVal] = useState();
    const [displayMins, setDisplayMins] = useState();
    const [displaySecs, setDisplaySecs] = useState();
    // state to account for drift
    const [expected, setExpected] = useState();
    // sound function
    const [play] = useSound(timerSfx, { volume: (volume * 1/100) });

    const handleDrag = (e, data) =>{
        setDrag(!drag);
        setTimerPosition({ x: data.x, y: data.y });
    }

    const handlePaused = () => {
        setExpected(Date.now());
        setPaused(!paused);
    }

    const handleRestart = () => {
        setPaused(true);
        setRemaining(startVal);
        setElapsed(0);
    }

    // skips to next time period
    const handleSkip = useCallback(() => {
        // change current period
        if (currentPeriod === 'work') {
            setWorksDone(worksDone + 1);
            if (worksDone % longBrInterval === 0) {
                setCurrentPeriod('long');
            } else {
                setCurrentPeriod('short');
            }
        } else {
            setCurrentPeriod('work');
        }
    }, [currentPeriod, setCurrentPeriod, setWorksDone, worksDone, longBrInterval]);

    // whenever period changes, pause and set elapsed to 0
    useEffect(() => {
        setElapsed(0);
        setPaused(true);
    },[currentPeriod]);

    // whenever time period OR length of period changes, set the start value respective to that time period
    useEffect(() => {
        // finds the correct total time that the timer should start at in seconds
        const findTime = () => {
            if (currentPeriod === 'work') {
                setStartVal(minutesToSeconds(workLen));
            } else if (currentPeriod === 'short') {
                setStartVal(minutesToSeconds(shortBreakLen));
            } else {
                setStartVal(minutesToSeconds(longBreakLen));
            }
        }

        findTime();
    }, [currentPeriod, workLen,shortBreakLen, longBreakLen]);

    // interval to elapse time. Increments elapsed by 1 every second. 
    useEffect(() => {
        if (!paused) {
            // accounting for drift. Our drift will in most cases be greater than we expected, since will likely take longer.
            let drift = Date.now() - expected;
            let interval;

            if (drift < 1000) {
                setExpected(expected + 1000);
                interval = workerTimers.setInterval(() => setElapsed(elapsed + 1), 1000 - drift);
            } else  {
                // In this case our drift has exceeded our interval.
                // If remaining is >= 2, we can set elapsed one more forward. It will look like we are skipping a second.  
                // Otherwise, there will just be one extra second on the timer. 
                if (remaining >= 2) {
                    drift -= 1000;
                    setExpected(expected + 2000);
                    interval = workerTimers.setInterval(() => setElapsed(elapsed + 2), 1000 - drift);
                }
            } 

            return () => workerTimers.clearInterval(interval);
        }
    }, [elapsed, paused]);

    // updating time values
    useEffect(() => {
        if (loggedIn) {
            if (elapsed !== 0 && elapsed % 60 === 0) {
                setTotalTime(totalTime + 1)
    
                if (currentPeriod === 'work') {
                    setTimeStudied(timeStudied + 1);
                } else {
                    setTimeOnBreak(timeOnBreak + 1);
                }
            }
        }
    }, [elapsed])

    // sets remaining time to startval - elapsed.
    useEffect(() => {
        if (startVal) {
            setRemaining(startVal - elapsed);
            
        }
    }, [startVal, elapsed])

    // whenever remaining changes, update the display minutes and seconds
    useEffect(() => {
        if (remaining === 0) {
            play();
            handleSkip();
        } else if (remaining) {
            setDisplayMins(getDisplayMins(remaining));
            setDisplaySecs(getDisplaySecs(remaining));
        }
    }, [remaining, handleSkip]);

    useEffect(() => {
        document.title = `pomodoros - ${displayMins}:${displaySecs}`;
    }, [displayMins, displaySecs])
    
    return (
    <div className='Timer'>
            <div className='Timer__countdown-container'>
                <Draggable
                    position={timerPosition}
                    onStart={handleDrag}
                    onStop={handleDrag}
                    handle='.handle'
                >
                    <div 
                    className='Timer__control-container'
                    style={{
                        outline: drag ? '1px solid rgb(255, 238, 0)' : 'none',
                    }}>
                        <div className='handle'>
                            <p className='Timer__text'>{displayMins}:{displaySecs}</p>
                        </div>
                        <div className='Timer__button-container'>
                            <button onClick={handlePaused} className='Timer__button'>
                                {paused ? <>start</> : <>pause</>}
                            </button>
                            <button onClick={handleRestart} className='Timer__button'>
                                restart
                            </button>
                            <button onClick={handleSkip} className='Timer__button'>
                                skip
                            </button>
                        </div>
                    </div>
                </ Draggable >
            </div>
    </div>
    )
}

export default Timer;