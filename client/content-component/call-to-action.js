import React from 'react';
import {Link} from 'react-router-dom';
const CallToAction = () => {
return (
<div className="call-to-action-top text-center">
    <p className='join_us'>Join us now!</p>
    <div className="cta-btn">
        <Link to='/freelancer/signup/'><button className='btn'>Become a Freelancer!</button></Link>
        <Link to='/ccom/signup'><button className='btn'>Post a Job!</button></Link>
        <Link to='/login'><button className='btn'>Login</button></Link>
    </div>
</div>
)
}
export default CallToAction;