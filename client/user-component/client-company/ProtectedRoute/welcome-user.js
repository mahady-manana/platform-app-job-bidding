import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckNewSignupContext } from '../../../SharedRouter';
import Auth from '../../auth/auth.api';

export const WelcomeToGoInside = () => {
const {loginAndLogoutContext, setLoginAndLogoutContext} = useContext(CheckNewSignupContext)
useEffect(() => {
    let cleanup = false;
    const auth = Auth.isAuthenticated();
    if (auth) {
        setLoginAndLogoutContext(!loginAndLogoutContext);
    }
    return () => cleanup = true;
}, [])
return (
<div className='assistant assistant-step1'>
<div className="inner-content">
    <section className="section">
        <div className="inner-section">
            <div className="container">
                <div className='row'>
                    <div className='col-sm-6 image-welcomen'>
                        <div className='image-container'>
                            <img  className='image-in-welcome-user' src='/images/welcome-user.jpg' alt='welcome at Go Inside'/>
                        </div>
                    </div>
                    <div className="col-sm-6 welcome-new-user">
                        <div className='inner-col'>
                            <h3>Welcome To Go-Inside!</h3>
                            <h4>Let's start your Go-Career!</h4>
                            <p>Go Inside is a Client-Talent Partnership Lorem ipsum dolor sit, 
                                amet consectetur adipisicing elit. Hic eius vero, nulla, 
                                ullam doloremque facilis quod in, totam consequatur commodi 
                                voluptatibus ducimus asperiores cum at? Vitae totam et nam aut.</p>
                            <Link className='tosetting' to={`/ccom/profile/settings/`}><button className='btn btn-to-complete-profile'>LET'S COMPLETE YOUR PROFILE</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</div>
)
}