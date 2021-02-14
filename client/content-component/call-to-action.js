import React from 'react';
import {Link} from 'react-router-dom';
const CallToAction = () => {
const testClick = event => {
    event.preventDefault();
    console.log('OK FINE')
}
return (
<div className="call-to-action-top text-center">
    <p className='join_us'>Join us now!</p>
    <div className="cta-btn">
        <Link to='/freelancer/signup/'><button className='btn join_as_freelancer'>Become a Freelancer!</button></Link>
        <button className='btn hire_a_freelancer' onClick={testClick}>Hire a Talent!</button>
        <Link to='/login'><button className='btn login'>Login</button></Link>
    </div>
</div>
)
}
export default CallToAction;