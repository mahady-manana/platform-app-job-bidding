import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import {CCContext} from './CCContext';
import {CCPreSignup} from './CCPreSignup';
import {EmailVerification} from './email-verification';
import { Profile } from './ProtectedRoute/profile';
import ProfileSettings from './ProtectedRoute/profile-settings';
import { WelcomeToGoInside } from './ProtectedRoute/welcome-user';

export const CCRoute = () => {

const [ccoContext, setCCContext] = useState({})
return (

<CCContext.Provider value={{ccoContext, setCCContext}}>
    <div className='ccom-content'>
        <Route path='/ccom/signup' component={CCPreSignup}/>
        <Route exact path='/ccom/user/signup/verification/:time' component={EmailVerification}/>
        <ProtectedRoute path='/ccom/welcome/steps' component={WelcomeToGoInside}/>
        <ProtectedRoute path='/ccom/profile/settings/' component={ProfileSettings}/>
        <ProtectedRoute path='/ccom/profile/view/' component={Profile}/>
    </div>
</CCContext.Provider>
)
}