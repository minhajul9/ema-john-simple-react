import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
    
    const [show, setShow] = useState(false);
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then(result => {
            console.log(result.user);
            form.reset();
            navigate(from)
        })
        .catch(error => console.log(error))

        
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>

            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="email" required placeholder='Enter your Email' />
                </div>
                <div className="form-control">
                    <label htmlFor="">Password</label>
                    <input type={show? "text":"password"} name="password" id="pass" required placeholder='Enter your password' />
                    <p onClick={() => {setShow(!show)}}>
                        {show? 'Hide password' : "Show password"}
                    </p>
                </div>
                <input type="submit" value="Login" className='btn-submit' />
                <p className='new-acc'>New to Ema-john? <Link to='/signup' className='create-new'>Create New Account</Link></p>
            </form>
        </div>
    );
};

export default Login;