import './Dashboard.css';
import { useState } from 'react';
import Modal from './Modal';
import LoginRegisterForm from './LoginRegisterForm';
import SettingsForm from './SettingsForm';

function Dashboard({workLen, setWorkLen, shortBreakLen, setShortBreakLen, longBreakLen, setLongBreakLen}) {

    const props = {workLen, setWorkLen, shortBreakLen, setShortBreakLen, longBreakLen, setLongBreakLen}

    const [showSettings, setShowSettings] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    }

    const toggleSignIn = () => {
        setShowSignIn(!showSignIn);
    }

    return (
        <div className='Dashboard__buttons-container'>
            <div className='Dashboard__left-buttons-container'>
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
