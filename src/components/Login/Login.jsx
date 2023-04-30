import React from 'react';
import './Login.css'
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>

            <form>
                <div className="form-control">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="" required placeholder='Enter your Email' />
                </div>
                <div className="form-control">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="" required placeholder='Enter your password' />
                </div>
                <input type="submit" value="Login" className='btn-submit' />
                <p className='new-acc'>New to Ema-john? <Link to='/signup' className='create-new'>Create New Account</Link></p>
            </form>
        </div>
    );
};

export default Login;