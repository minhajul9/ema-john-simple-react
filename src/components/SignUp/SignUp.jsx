import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const SignUp = () => {

    const [error, setError] = useState('');

    const {createUser} = useContext(AuthContext)

    const handleSignUp = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        setError('')
        if(password !== confirm){
            setError("Password does not match");
            return
        }
        else if(password.length < 6){
            setError('Password must be at least 6 character')
            return;
        }

        createUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error => {
            console.log(error)
            setError(error.message)
        })

    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>

            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="email" required placeholder='Enter your Email' />
                </div>
                <div className="form-control">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="password" required placeholder='Enter your password' />
                </div>
                <div className="form-control">
                    <label htmlFor="">Password</label>
                    <input type="password" name="confirm" id="confirm" required placeholder='Confirm password' />
                </div>
                <p className='error-text'>{error}</p>
                <input type="submit" value="Sign Up" className='btn-submit' />

                <p className='new-acc'>Already have an account? <Link to='/login' className='create-new'>Login</Link></p>
            </form>
        </div>
    );
};

export default SignUp;