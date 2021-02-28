import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import EmailVerifacation from "./email-verification";
import FreelancerPreSignup from "./pre.signup.freelancer";
import { FreelancerContext } from "./FreelancerContext";
import { ProtectedRoute } from '../auth/ProtectedRoute';
import Dashbord from './ProtectedRoute/dashbord';
import FillSignup from './ProtectedRoute/full.signup';
import { WelcomeToGoInside } from './welcome-user';
const FreelancerRoute = () => {

    const [contextValues, setContextValues] = useState({})
return (

<FreelancerContext.Provider value={{contextValues, setContextValues}}>
    <div className='freelancer-content'>
        <Route path='/freelancer/signup' component={FreelancerPreSignup}/>
        <Route exact path='/freelancer/user/signup/verification/:time' component={EmailVerifacation}/>
        <ProtectedRoute path='/freelancer/dashbord' component={Dashbord}/>
        <ProtectedRoute path='/freelancer/welcome/steps' component={WelcomeToGoInside}/>
        <ProtectedRoute path='/freelancer/settings/profile/edit/:id' component={FillSignup}/>
    </div>
</FreelancerContext.Provider>
)
}
export default FreelancerRoute;