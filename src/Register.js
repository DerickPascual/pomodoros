import './Form.css';
import { useState } from 'react';

function Register(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [verificationPass, setVerificationPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    const [emailIsFocused, setEmailIsFocused] = useState(false);

    const handleEmailFocusBlur = () => {
        setEmailIsFocused(!emailIsFocused);
    }

    const [passIsFocused, setPassIsFocused] = useState(false);

    const handlePassFocusBlur = () => {
        setPassIsFocused(!passIsFocused);
    }

    const [verificationPassIsFocused, setVerificationPassIsFocused] = useState(false);

    const handleVerificationPassFocusBlur = () => {
        setVerificationPassIsFocused(!verificationPassIsFocused);
    }

    const minsToMilliseconds = (minutes) => {
        // takes in minutes (xxxxx.xxxxx)
        // returns milliseconds rounded to the nearest thousand milliseconds
        const milliseconds = minutes * 60 * 1000;
        return Math.round(milliseconds / 1000) * 1000;
    }

    return (
        <div className='Form'>
            <form onSubmit={handleSubmit}>
                <label for='email'>email</label>
                <input 
                    onFocus = {handleEmailFocusBlur}
                    onBlur = {handleEmailFocusBlur}
                    style = {{
                        outline: emailIsFocused ? '2px solid orange' : 'none'
                    }}
                    className='Form__text-input'
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type='email' 
                    placeholder='email' 
                    id='email' 
                    name='email' />
                <label for='password'>password</label>
                <input 
                    onFocus = {handlePassFocusBlur}
                    onBlur = {handlePassFocusBlur}
                    style = {{
                        outline: passIsFocused ? '2px solid orange' : 'none'
                    }}
                    className='Form__text-input'
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)}
                    type='password' 
                    placeholder='password' 
                    id='password' 
                    name='password' />
                <label for='verification-password'>confirm password</label>
                <input 
                    onFocus = {handleVerificationPassFocusBlur}
                    onBlur = {handleVerificationPassFocusBlur}
                    style = {{
                        outline: verificationPassIsFocused ? '2px solid orange' : 'none'
                    }}
                    className='Form__text-input'
                    value={verificationPass} 
                    onChange={(e) => setVerificationPass(e.target.value)}
                    type='password' 
                    placeholder='password' 
                    id='verification-password' 
                    name='verification-password' />
                <div className='Form__submit-container'>
                    <button className='Form__button' >register</button>
                </div>
            </form>
            <div className='Form__switch-container'>
                <button className='Form__button' onClick={() => props.onFormSwitch('login')}>returning? log in</button>
            </div>
        </div>
    )
}

export default Register;