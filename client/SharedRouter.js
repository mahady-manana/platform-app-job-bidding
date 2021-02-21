import React from "react";
import {Switch, Route} from "react-router-dom";
import Footer from "./content-component/footer";
import Homepage from "./content-component/homepage";
import Menu from "./content-component/menu";
import ClientRoute from "./user-component/client-components/ClientRouter";
import FreelancerRoute from "./user-component/freelancer/FreelancerRoute";
import Login from "./user-component/login";

const SharedRouter = () => {
return (
    <Switch>
        <>
        <Menu/>
        <Route exact path="/" component={Homepage}/>
        <Route path="/login/" component={Login}/>
        <Route path='/freelancer/' component={FreelancerRoute}/>
        <Route path='/client/' component={ClientRoute}/>
        <Footer/>
        </>
    </Switch>
)
}
export default SharedRouter;