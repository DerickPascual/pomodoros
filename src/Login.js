import './Login.css';
import { useState } from 'react';

function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

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

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit}>
                <label for='email'>email</label>
                <input 
                    onFocus = {handleEmailFocusBlur}
                    onBlur = {handleEmailFocusBlur}
                    style = {{
                        outline: emailIsFocused ? '2px solid orange' : 'none'
                    }}
                    className='LoginRegisterForm__text-input'
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type='email' 
                    placeholder='' 
                    id='email' 
                    name='email' />
                <label for='password'>password</label>
                <input 
                    onFocus = {handlePassFocusBlur}
                    onBlur = {handlePassFocusBlur}
                    style = {{
                        outline: passIsFocused ? '2px solid orange' : 'none'
                    }}
                    className='LoginRegisterForm__text-input'
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)}
                    type='password' 
                    placeholder='' 
                    id='password' 
                    name='email' />
                <div className='LoginRegisterForm__submit-container'>
                    <button className='LoginRegisterForm__button'>log in</button>
                </div>
            </form>
            <div className='LoginRegisterForm__switch-container'>
                <button className='LoginRegisterForm__button' onClick={() => props.onFormSwitch('register')}>new? register</button>
            </div>
        </div>
    )
}

export default Login;