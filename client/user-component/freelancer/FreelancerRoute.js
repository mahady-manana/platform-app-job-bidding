import React, {useState} from 'react';
import {Router, Route} from 'react-router-dom';
import EmailVerifacation from "./email-verification";
import FillSignup from "./full.signup";
import FreelancerPreSignup from "./pre.signup.freelancer";
import { FreelancerContext } from "./FreelancerContext";
const FreelancerRoute = () => {

    const [contextValues, setContextValues] = useState({})
return (

<FreelancerContext.Provider value={{contextValues, setContextValues}}>
    <div className='freelancer-content'>
        <Route path='/freelancer/signup' component={FreelancerPreSignup}/>
        <Route exact path='/freelancer/fill/profile/type-workers/:time/:name/e/' component={FillSignup}/>
        <Route exact path='/freelancer/user/signup/verification/:time/:name/v/' component={EmailVerifacation}/>
    </div>
</FreelancerContext.Provider>
)
}
export default FreelancerRoute;