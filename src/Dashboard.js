import './Dashboard.css';
import { useState } from 'react';
import Modal from './Modal';
import LoginRegisterForm from './LoginRegisterForm';
import SettingsForm from './SettingsForm';

function Dashboard({workLen, setWorkLen, shortBreakLen, setShortBreakLen, longBreakLen, setLongBreakLen, currentPeriod, setCurrentPeriod, longBrInterval, setLongBrInterval}) {

    const props = {workLen, setWorkLen, shortBreakLen, setShortBreakLen, longBreakLen, setLongBreakLen, currentPeriod, setCurrentPeriod, longBrInterval, setLongBrInterval}

    const [showSettings, setShowSettings] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    }

    const toggleSignIn = () => {
        setShowSignIn(!showSignIn);
    }

    const handleWork = () => {
        setCurrentPeriod('work');
    }

    const handleShort = () => {
        setCurrentPeriod('short')
    }
    
    const handleLong = () => {
        setCurrentPeriod('long')
    }

    return (
        <div className='Dashboard__buttons-container'>
            <div className='Dashboard__left-buttons-container'>
                <button onClick={handleWork} className='Dashboard__button'>
                    work
                </button>
                <button onClick={handleShort} className='Dashboard__button'>
                    short break
                </button>
                <button onClick={handleLong} className='Dashboard__button'>
                    long break
                </button>
                <button className='Dashboard__button' onClick={toggleSettings}>
                    settings
                </button>
                {showSettings && 
                    <Modal toggleVisibility={toggleSettings}>
                        <SettingsForm {...props} />
                    </Modal>
                }
            </div>
            <div className='Dashboard__right-buttons-container'>
                <button className='Dashboard__button' onClick={toggleSignIn}>
                    sign in
                </button>
                    {showSignIn &&
                        <Modal toggleVisibility={toggleSignIn}>
                            <LoginRegisterForm />
                        </Modal>
                    }
            </div>
        </div>
    );
}

export default Dashboard;
