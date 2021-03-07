import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {create} from '../api/api-client';
import { TopContext } from '../../TopContext';
import { signin } from '../auth/router.api';
import Auth from '../auth/auth.api';
import { CCContext } from './CCContext';

export const EmailVerification = () => {
const {ccoContext} = useContext(CCContext);
const {setTopContext} = useContext(TopContext);

const [user, setUser] = useState({
    code : '',
    firstname : '',
    email : '',
    password : '',
    lastname : '',
    company : '',
    user_id : '',
    loading : false,
    isValid : false,
    invalid : false,
    error : false,
    danger : '',
    errorMsg : '',
    empty : false
})

useEffect(() => {
    let cleanup = false;
    if (ccoContext !== undefined) {
        setUser({...user, firstname : ccoContext.firstname, lastname : ccoContext.lastname, company : ccoContext.company, email : ccoContext.email, password : ccoContext.password})
    }
    return () => cleanup = true;
}, [])
const handleChange = event => {
    event.preventDefault();
    setUser({...user, code : event.target.value, invalid : false, empty : false, danger : ''})
}
const verifyCode = event => {
    event.preventDefault();
    setUser({...user, loading : true})
    
    const datas = {
        firstname : ccoContext.firstname,
        lastname : ccoContext.lastname,
        company : ccoContext.company,
        password : ccoContext.password,
        email : ccoContext.email,
        joined : Date.now() 
    }
    if (user.code !== ccoContext.code.toString()) {
        setUser({...user, loading : false, invalid : true})
    } else {
        setTopContext(user)
        create(datas).then(data => {
            if (data.error) {
                setUser({...user, loading : false, error : true, errorMsg : data.error})
            } else {
                signin({
                    email : user.email,
                    password : user.password
                }).then(data => {
                    if (data.error) {
                        setUser({...user, loading : false, danger : data.error})
                    } else {
                        Auth.authenticate(data, () => {
                            setUser({...user, user_id : data.user._id,loading : false, isValid : true})
                            setTopContext(user)
                        })
                    }
                })
            }
        })
    }
}
const {isValid} = user
if (isValid) {
    return (
        <Redirect to={{
                pathname :`/ccom/welcome/steps/`,
                state : {user}
            }}/>
    )
}
const closeX = event => {
    event.preventDefault();
    setUser({...user, error : !user.error})
}
return (
<>
<div className='email-verification'>
    <div className='entry'>
    <section className='section'>
        <div className='inner-section' style={{background : 'url(/images/bg-verify.jpg) no-repeat center', backgroundSize : 'cover'}}>
            <div className='container'>
                <div className='codedigitlink'>
                <h3>User verification</h3>
                <div className="form-container">
                    <form onSubmit={verifyCode}>
                        <div className="form-group">
                            <label htmlFor="code">Enter 6 digit code : </label>
                            <input type="number" className="form-control" name='code' value={user.code} onChange={handleChange} placeholder='6-Code here'/>
                        </div>
                        <p className='text-danger'>{user.invalid ? 'Code invalid please check again!' : ''}</p>
                        <p className='text-danger'>{user.empty ? 'Please fill in the code!' : ''}</p>
                        <p className='text-danger'>{user.danger}</p>
                        <button type="submit" className='btn white mbgc-1'>Verify</button>
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
<div className={`popup error-validation-message ${user.error ? '' : 'closex'}`}>
        <span className='btn-closex' onClick={closeX}>X</span>
        <div className="error-message text-left">
            <h3 className='text-danger'>Error :</h3>
            <p className='text-danger'>{user.errorMsg}</p>
            <p>This may happen if :</p>
            <ul>
                <li>Your email was already associated with another Go-Inside Account.</li>
                <li>You internet connection shutdown unexpecteadly.</li>
            </ul>
        </div>
</div>

</>    
)
}