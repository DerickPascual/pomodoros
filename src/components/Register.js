import '../styles/Form.css';
import { useState } from 'react';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";

function Register(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [verificationPass, setVerificationPass] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [showFormsErr, setShowFormsErr] = useState(false);
    const [showVerifyErr, setShowVerifyErr] = useState(false);
    const [showPassLenErr, setShowPassLenErr] = useState(false);
    const [duplicateErr, setDuplicateErr] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !pass || !verificationPass) {
            setShowFormsErr(true);
        } else if (verificationPass !== pass) {
            setShowVerifyErr(true);
            setIsRegistered(false);
        } else {
            setShowFormsErr(false);
            setShowVerifyErr(false);
            setDuplicateErr(false);
            setShowPassLenErr(false);

            await createUserWithEmailAndPassword(auth, email, pass)
            .then( async (userCredential) => {
                setIsRegistered(true);
                setShowVerifyErr(false);
                
                const uid = userCredential.user.uid
                
                try {
                    const newUserRef = await setDoc(doc(db, "users", uid), {
                        email: email,
                        totalTime: 0,
                        timeStudied: 0,
                        timeOnBreak: 0
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {

                const errorCode = error.code;
                
                if (errorCode === 'auth/email-already-in-use') {
                    setDuplicateErr(true);
                } else if (errorCode === 'auth/weak-password') {
                    setShowPassLenErr(true);
                }
            })
        }
        
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

    return (
        <div className='Form'>
            <form onSubmit={handleSubmit}>
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
                    name='password' />
                <label htmlFor='verification-password'>confirm password</label>
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
                    <button className='Form__button' >submit and login</button>
                </div>
            </form>
            <div>
                {isRegistered ? <div className="Form__success">successfully registered!</div> : <></>}
                {showVerifyErr ? <div className="Form__error">passwords do not match</div> : <></>}
                {duplicateErr ? <div className="Form__error">email already in use</div> : <></>}
                {showPassLenErr ? <div className="Form__error">password must be greater than 6 characters</div> : <></>}
                {showFormsErr ? <div className="Form__error">all forms required</div> : <></>}
            </div>
            <p>---------------------</p>
            <div className='Form__switch-container'>
                <button className='Form__button' onClick={() => props.onFormSwitch('login')}>returning user?</button>
            </div>
        </div>
    )
}

export default Register;