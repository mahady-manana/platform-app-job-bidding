import React from "react";
import {Switch, Route} from "react-router-dom";
import Footer from "./content-component/footer";
import Homepage from "./content-component/homepage";
import Menu from "./content-component/menu";
import EmailVerifacation from "./user-component/email-verification";
import FillSignup from "./user-component/freelancer/full.signup";
import Login from "./user-component/login";
import FreelancerPreSignup from "./user-component/pre.signup.freelancer";
import PrivateRoute from "./user-component/UserOnlyRouter";

const SharedRouter = () => {
return (
    <Switch>
        <>
        <Menu/>
        <Route exact path="/" component={Homepage}/>
        <Route path="/login/" component={Login}/>
        <Route path='/freelancer/signup' component={FreelancerPreSignup}/>
        <Route path='/fill/9/3/5/4/1/2/5/profile' component={FillSignup}/>
        <PrivateRoute path="/dashbord/" component={Login}/>
        <Route path='/user/signup/verification/' component={EmailVerifacation}/>
        <Footer/>
        </>
    </Switch>
)
}

export default SharedRouter;