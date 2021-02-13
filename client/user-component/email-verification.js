import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
const EmailVerifacation = props => {
const [user, setUser] = useState({
    code : '',
    email : props.location.state.infos.email,
    password : props.location.state.infos.password,
    isValid : false,
    error : false
})

const handleChange = event => {
    event.preventDefault();
    setUser({...user, code : event.target.value})
}
const verifyCode = event => {
    event.preventDefault();
    if (user.code !== props.location.state.infos.code.toString()) {
        setUser({...user, error : true})
    } else {
        setUser({...user, isValid : true})
    }
}
const {isValid} = user
if (isValid) {
    return (
        <Redirect to={{
            pathname :'/fill/9/3/5/4/1/2/5/profile',
            state : {user}
            }}/>
    )
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
                <div className='intro-verification'>
                 <p>Please verify your INBOX or SPAM to continue.
                 <br/>Paste the 6 digit code here</p>
                 <p className='text-danger'>You lost the code if you leave this tab</p>
                </div>
                <div className="form-container">
                    <form onSubmit={verifyCode}>
                        <div className="form-group">
                            <label htmlFor="code">6 digit code : </label>
                            <input type="number" className="form-control" name='code' value={user.code} onChange={handleChange} placeholder='Code here'/>
                        </div>
                        <p className='text-danger'>{user.error ? 'Code invalid please check again!' : ''}</p>
                        <button type="submit" className='btn default-1 enable'>Verify</button>
                    </form>
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