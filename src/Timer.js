import './Timer.css'
import Draggable from 'react-draggable';
import { useState, useEffect, useCallback} from 'react';

function Timer({workLen, shortBreakLen, longBreakLen, currentPeriod, setCurrentPeriod, longBrInterval}) {
    const [drag, setDrag] = useState(false);
    const [paused, setPaused] = useState(true);
    const [worksDone, setWorksDone] = useState(1);
    const[remaining, setRemaining] = useState();
    const [elapsed, setElapsed] = useState(0);

    const handleDrag = () =>{
        setDrag(!drag);
    }

    const handlePaused = () => {
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
    },[currentPeriod])

    // given minutes, returns seconds to nearest second
    const minutesToSeconds = (minutes) => {
        return Math.round(minutes * 60);
    }

    // variable to store the amount of time in seconds the timer should start at
    const [startVal, setStartVal] = useState();

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
    }, [currentPeriod, workLen,shortBreakLen, longBreakLen])

    // interval to elapse time. Increments elapsed by 1 every second. 
    useEffect(() => {
        if (!paused) {
            const interval = setInterval(() => setElapsed(elapsed + 1), 1000);
            return () => clearInterval(interval);

        }
    }, [elapsed, paused])

    // sets remaining time to startval - elapsed.
    useEffect(() => {
        if (startVal) {
            setRemaining(startVal - elapsed);
        }
    }, [startVal, elapsed])

    const [displayMins, setDisplayMins] = useState();
    const [displaySecs, setDisplaySecs] = useState();

    // whenever remaining changes, update the display minutes and seconds
    useEffect(() => {
        if (remaining) {
            setDisplayMins(getDisplayMins(remaining));
            setDisplaySecs(getDisplaySecs(remaining));
        }
    }, [remaining]);

    useEffect(() => {
        if (remaining === 0) {
            handleSkip()
        }

    }, [remaining, handleSkip])

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
    
    return (
    <div className='Timer'>
            <div className='Timer__countdown-container'>
                <Draggable
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