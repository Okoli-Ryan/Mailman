import React from 'react';
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, isLogged, ...rest}) => {

    return (
        <Route {...rest} render={(props) => isLogged === true ?
             <Component {...props} />
            :
            <Redirect to={{pathname:'/login', state: {from: props.location}}}/>
        } />
    )
}

export default PrivateRoute