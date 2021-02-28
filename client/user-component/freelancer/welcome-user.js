import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TopContext } from '../../TopContext';
import Auth from '../auth/auth.api';

export const WelcomeToGoInside = () => {
const {topContext} = useContext(TopContext)
const [user_id, setID] = useState('')
useEffect(() => {
    let cleanup = false;
    setID(Auth.isAuthenticated().user._id)
    return () => {
        cleanup = true;
    }
})
const Test = event => {
    event.preventDefault();
    console.log(topContext)
}
return (
<div className='assistant assistant-step1'>
<div className="inner-content">
    <section className="section">
        <div className="inner-section">
            <div className="container">
                <div className="welcome-new-user">
                    <span onClick={Test}>Click</span>
                    <p className='step-title step1'>Step 1</p>
                    <h3>Hi {topContext.firstname} Welcome To Go-Inside!</h3>
                    <h4>I am your Assistant - Let's start your Go-Career!</h4>
                    <p>Go Inside is a Client-Talent Partnership Lorem ipsum dolor sit, 
                        amet consectetur adipisicing elit. Hic eius vero, nulla, 
                        ullam doloremque facilis quod in, totam consequatur commodi 
                        voluptatibus ducimus asperiores cum at? Vitae totam et nam aut.</p>
                    <Link to={`/freelancer/settings/profile/edit/${user_id}/`}><button className='btn btn-to-complete-profile'>Let's complete your profile </button></Link>
                </div>
            </div>
        </div>
    </section>
</div>
</div>
)
}