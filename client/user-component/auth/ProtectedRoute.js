import React from 'react';
import Auth from './auth.api';
import {Route, Redirect} from 'react-router-dom';
export const ProtectedRoute = ({component : Component, ...rest}) => (
    <Route {...rest} render = {
        props => (
            Auth.isAuthenticated().user !== undefined ? (
                <Component {...props}/>
            ) : (
                <Redirect to = {{
                    pathname : '/login',
                    state : {from : props.location}
                }}/>
            )
        )
    }/>
)