import '../styles/Form.css';
import { useState } from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';

function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [userPassErr, setUserPassErr] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, pass)
        .then( async (userCredential) => {
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                setUserPassErr(true);
            }

        });
    }

    const [emailIsFocused, setEmailIsFocused] = useState(false);

    const handleEmailFocusBlur = () => {
        setEmailIsFocused(!emailIsFocused);
    }

    const [passIsFocused, setPassIsFocused] = useState(false);

    const handlePassFocusBlur = () => {
        setPassIsFocused(!passIsFocused);
    }

    return (
        <div className='Form'>
            <form>
                <label htmlFor='email'>email</label>
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
                <label htmlFor='password'>password</label>
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
                    name='email' />
                <div className='Form__submit-container'>
                    <button className='Form__button' onClick={handleSubmit}>log in</button>
                </div>
                {userPassErr && <div className='Form__error'>incorrect username or password</div>}
            </form>
            <p>---------------------</p>
            <div className='Form__switch-container'>
                <button className='Form__button' onClick={() => props.onFormSwitch('reset-password')}>forgot password</button>
                <button style={{marginTop: '20px'}} className='Form__button' onClick={() => props.onFormSwitch('register')}>create new account</button>
            </div>
        </div>
    )
}

export default Login;