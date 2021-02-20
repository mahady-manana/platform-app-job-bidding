import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {FreelancerContext} from './FreelancerContext';

const EmailVerifacation = props => {
const context = useContext(FreelancerContext);

const [user, setUser] = useState({
    code : '',
    firstname : '',
    email : '',
    lastname : '',
    isValid : false,
    error : false
})

useEffect(() => {
    let cleanup = false;
    const data = context.contextValues
    if (data !== undefined) {
        setUser({...user, firstname : data.firstname, lastname : data.lastname, email : data.email})
    }
    return () => {
        cleanup = true;
    }
}, [])
const handleChange = event => {
    event.preventDefault();
    setUser({...user, code : event.target.value})
}
const verifyCode = event => {
    event.preventDefault();
    if (user.code !== context.contextValues.code.toString()) {
        setUser({...user, error : true})
    } else {
        setUser({...user, isValid : true})
    }
}

const {isValid} = user
if (isValid) {
    return (
        <Redirect to={{
            pathname :`/freelancer/fill/profile/type-workers/${user.firstname}/${user.lastname}/e/`,
            state : {user}
            }}/>
    )
}
const Test = event => {
    event.preventDefault()
    const {contextValues} = context
    console.log(contextValues)
} 
return (
<>
<div className='email-verification'>
    <div className='entry'>
    <section className='section'>
        <div className='inner-section'>
            <div className='container'>
                <div className='codedigitlink'>
                <h3>Verification...</h3>
                <button onClick={Test}>click</button>
                <div className="form-container">
                    <form onSubmit={verifyCode}>
                        <div className="form-group">
                            <label htmlFor="code">Enter 6 digit code : </label>
                            <input type="number" className="form-control" name='code' value={user.code} onChange={handleChange} placeholder='6-Code here'/>
                        </div>
                        <p className='text-danger'>{user.error ? 'Code invalid please check again!' : ''}</p>
                        <button type="submit" className='btn default-1 enable'>Verify</button>
                    </form>
                    <div className='intro-verification'>
                    <p>We have just sent your code at : <span className='email-user'>{user.email}</span></p>
                    <p>Please verify your INBOX or SPAM.</p>
                    <p className='text-danger'>You lost the code if you leave this tab</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
    </div>
</div>
<div className={`loading-popup ${user.loading ? '' : 'closex'}`}>
        <span className='loading-icon'>Processing...</span>
</div>
</>    
)
}
export default EmailVerifacation;