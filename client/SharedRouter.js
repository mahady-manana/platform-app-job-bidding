import React, {useState} from "react";
import {Switch, Route} from "react-router-dom";
import Footer from "./content-component/footer";
import Homepage from "./content-component/homepage";
import Menu from "./content-component/menu";
import { TopContext } from "./TopContext";
import ClientRoute from "./user-component/client-components/ClientRouter";
import FreelancerRoute from "./user-component/freelancer/FreelancerRoute";
import Login from "./user-component/login";
// CCRouter
import {CCRoute} from './user-component/client-company/CCRoute';

export const CheckNewSignupContext = React.createContext(null)

const SharedRouter = () => {
const [loginAndLogoutContext, setLoginAndLogoutContext] = useState(false)
const [topContext, setTopContext] = useState({
    firstname : '',
    lastname : '',
    avatar : '',
}); 
return (
<TopContext.Provider value={{topContext, setTopContext}}>
<CheckNewSignupContext.Provider value={{loginAndLogoutContext, setLoginAndLogoutContext}}>
    <Switch>
        <>
        <Menu/>
        <Route exact path="/" component={Homepage}/>
        <Route path="/login/" component={Login}/>
        <Route path='/freelancer/' component={FreelancerRoute}/>
        <Route path='/ccom/' component={CCRoute}/>
        <Route path='/client/' component={ClientRoute}/>
        <Footer/>
        </>
    </Switch>
</CheckNewSignupContext.Provider>
</TopContext.Provider>
)
}
export default SharedRouter;