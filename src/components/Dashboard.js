import '../styles/Dashboard.css';
import { useState } from 'react';
import Modal from './Modal';
import LoginRegisterForm from './LoginRegisterForm';
import SettingsForm from './SettingsForm';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

function Dashboard({workLen, setWorkLen, shortBreakLen, setShortBreakLen, longBreakLen, setLongBreakLen, currentPeriod, setCurrentPeriod, longBrInterval, setLongBrInterval, loggedIn, showStats, setShowStats, statsPosition, setStatsPosition, timerPosition, setTimerPosition, setTotalTime, setTimeStudied, setTimeOnBreak, statsType, setStatsType, userId, volume, setVolume}) {

    const props = {workLen, setWorkLen, shortBreakLen, setShortBreakLen, longBreakLen, setLongBreakLen, currentPeriod, setCurrentPeriod, longBrInterval, setLongBrInterval, loggedIn, showStats, setShowStats, statsPosition, setStatsPosition, timerPosition, setTimerPosition, setTotalTime, setTimeStudied, setTimeOnBreak, statsType, setStatsType, userId, volume, setVolume}

    const [showSettings, setShowSettings] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    }

    const toggleSignIn = () => {
        setShowSignIn(!showSignIn);
    }

    const toggleStats = () => {
        setShowStats(!showStats);
    }

    const handleWork = () => {
        setCurrentPeriod('work');
    }

    const handleShort = () => {
        setCurrentPeriod('short');

    }
    
    const handleLong = () => {
        setCurrentPeriod('long')
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {

        })
    }

    return (
        <div className='Dashboard__buttons-container'>
            <div>
                <div className='Dashboard__left-buttons-container'>
                    <button className='Dashboard__button' onClick={toggleSettings}>
                        settings
                    </button>
                    <button onClick={handleWork} className='Dashboard__button'>
                        work
                    </button>
                    <button onClick={handleShort} className='Dashboard__button'>
                        short break
                    </button>
                    <button onClick={handleLong} className='Dashboard__button'>
                        long break
                    </button>
                    <div>

                    </div>
                </div>
                <div>
                    {showSettings && 
                        <div>
                            <Modal toggleVisibility={toggleSettings}>
                                <SettingsForm {...props} />
                            </Modal>
                        </div>
                    }
                </div>
            </div>
            <div className='Dashboard__right-buttons-container'>
                {loggedIn && (
                    <div>
                        <button className='Dashboard__button' onClick={toggleStats}>
                            {showStats && 
                                <>hide  stats</>
                            }
                            {!showStats &&
                                <>show stats</>
                            }
                        </button>
                        <button className='Dashboard__button' onClick={handleSignOut}>
                            sign out
                        </button>
                    </div>
                )}
                {!loggedIn && (
                    <>
                    <button className='Dashboard__button' onClick={toggleSignIn}>
                        sign in
                    </button>
                        {showSignIn && (
                        <Modal toggleVisibility={toggleSignIn}>
                            <LoginRegisterForm setTotalTime={setTotalTime} setTimeStudied={setTimeStudied} setTimeOnBreak={setTimeOnBreak}/>
                        </Modal>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
