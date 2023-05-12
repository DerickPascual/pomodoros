import './Dashboard.css';
import { useState } from 'react';
import Modal from './Modal';
import LoginRegisterForm from './LoginRegisterForm';

function Dashboard() {
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
                <button className='Dashboard__button'>
                    short break
                </button>
                <button className='Dashboard__button'>
                    long break
                </button>
                <button className='Dashboard__button'>
                    work
                </button>
                <button className='Dashboard__button' onClick={toggleSettings}>
                    settings
                </button>
                {showSettings && 
                    <Modal toggleVisibility={toggleSettings}>
                        <p>short break length</p>
                        <p>long break length</p>
                        <p>work length</p>
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
