import React, { useEffect, useState } from 'react';
import Auth from './auth.api';
import {Route, Redirect} from 'react-router-dom';
export const ProtectedRoute = ({component : Component, ...rest}) => {

const [finishAPI, setAPIFinish] = useState(false);   
useEffect(() => {
    let cleanup = false;
    if (Auth.isAuthenticated() || Auth.isAuthenticated() === false) {
        setAPIFinish(true)
    }
    return () => {
        cleanup = true;
    }
}, [])    
const waiting = () => {
    if (finishAPI) {
        return (
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
    }
}
return (
<>
{waiting()}
</>   
)
}