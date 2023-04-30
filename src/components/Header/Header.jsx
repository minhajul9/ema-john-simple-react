import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut =()=>{
        logOut()
        .then(result => {})
        .catch(error => console.log(error))
    }


    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>

                {
                    user ?
                        <>
                            <span className="user-name">{user.email}</span>
                            <button onClick={handleLogOut}>Log Out</button>
                        </> :

                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                }
            </div>
        </nav>
    );
};

export default Header;