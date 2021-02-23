import React, {useState} from 'react';
import {Router, Route} from 'react-router-dom';
import ClientPreSignup from "./pre.signup.client";
import { ContextClient } from "./ContextClient";

const ClientRoute = () => {

const [contextValues, setContextValues] = useState({})
return (

<ContextClient.Provider value={{contextValues, setContextValues}}>
    <div className='client-content'>
        <Route path='/client/pre-signup' component={ClientPreSignup}/>
    </div>
</ContextClient.Provider>
)
}
export default ClientRoute;