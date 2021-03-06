import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import {CCContext} from './CCContext';
import {CCPreSignup} from './CCPreSignup';
import {EmailVerification} from './email-verification';
import { WelcomeToGoInside } from './ProtectedRoute/welcome-user';

export const CCRoute = () => {

const [ccoContext, setCCContext] = useState({})
return (

<CCContext.Provider value={{ccoContext, setCCContext}}>
    <div className='ccom-content'>
        <Route path='/ccom/signup' component={CCPreSignup}/>
        <Route exact path='/ccom/user/signup/verification/:time' component={EmailVerification}/>
        <ProtectedRoute path='/ccom/welcome/steps' component={WelcomeToGoInside}/>
        {/* <ProtectedRoute path='/ccom/profile/view/' component={Profile}/>
        <ProtectedRoute path='/ccom/profile/settings/' component={ProfileSettings}/> */}
    </div>
</CCContext.Provider>
)
}