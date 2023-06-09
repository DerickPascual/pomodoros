import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { useState } from 'react';

function LoginRegisterForm({setTotalTime, setTimeStudied, setTimeOnBreak}) {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className='LoginRegisterForm'>
            {
                currentForm === 'login' ? <Login setTotalTime={setTotalTime} setTimeStudied={setTimeStudied} setTimeOnBreak={setTimeOnBreak} onFormSwitch={toggleForm} /> :
                currentForm === 'register' ? <Register onFormSwitch={toggleForm} /> : <ForgotPassword onFormSwitch={toggleForm}/>
            }

        </div>
    )

}

export default LoginRegisterForm;