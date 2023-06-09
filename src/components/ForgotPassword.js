import '../styles/Form.css';
import { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword(props) {
    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleEmailFocusBlur = () => {
        setEmailIsFocused(!emailIsFocused);
    }

    const handleSubmit = async () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setEmailErr(false);
                setSuccess(true);
            })
            .catch((error) => {
                setEmailErr(true);
            })
    }

    return (
        <div className='Form'>
            <label htmlFor='email'>email</label>
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleEmailFocusBlur}
                onBlur={handleEmailFocusBlur}
                style={{
                    outline: emailIsFocused ? '2px solid orange' : 'none'
                }}
                className='Form__text-input'
                type='email'
                placeholder='email'/>
            <div className='Form__submit-container'>
                <button className='Form__button' onClick={handleSubmit}>send reset email</button>
            </div>
            {emailErr && <div className='Form__error'>invalid email</div>}
            {success && <div className='Form__success'>email sent</div>}
            <p>---------------------</p>
            <div className='Form__switch-container'>
                <button className='Form__button' style={{fontSize: 'medium'}}onClick={() => props.onFormSwitch('login')}>log in</button>
            </div>
        </div>
    )
}

export default ForgotPassword;