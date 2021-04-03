import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import EmailVerifacation from "./email-verification";
import FreelancerPreSignup from "./pre.signup.freelancer";
import { FreelancerContext } from "./FreelancerContext";
import { ProtectedRoute } from '../auth/ProtectedRoute';
import {Profile} from './ProtectedRoute/profile';
import ProfileSettings from './ProtectedRoute/profile-settings';
import { WelcomeToGoInside } from './ProtectedRoute/welcome-user';
const FreelancerRoute = () => {

    const [contextValues, setContextValues] = useState({})
return (

<FreelancerContext.Provider value={{contextValues, setContextValues}}>
    <div className='freelancer-content'>
        <Route path='/freelancer/signup' component={FreelancerPreSignup}/>
        <Route exact path='/freelancer/user/signup/verification/:time' component={EmailVerifacation}/>
        <ProtectedRoute path='/freelancer/profile/view/' component={Profile}/>
        <ProtectedRoute path='/freelancer/welcome/steps' component={WelcomeToGoInside}/>
        <ProtectedRoute path='/freelancer/profile/settings/' component={ProfileSettings}/>
    </div>
</FreelancerContext.Provider>
)
}
export default FreelancerRoute;