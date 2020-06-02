import React from 'react';
import {useDispatch} from 'react-redux'
import {logout} from '../actions/loginAction'

const Header = () => {

    const dispatch = useDispatch();

    return ( <div className="header">
       <p>M@ilman</p>
       <button onClick={() => dispatch(logout())}>Logout</button>
    </div> );
}
 
export default Header;