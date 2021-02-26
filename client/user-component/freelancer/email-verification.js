import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {FreelancerContext} from './FreelancerContext';
import {create} from './api/api-freelancer';
import { TopContext } from '../../TopContext';

const EmailVerifacation = props => {
const context = useContext(FreelancerContext);
const {setTopContext} = useContext(TopContext);

const [user, setUser] = useState({
    code : '',
    firstname : '',
    email : '',
    lastname : '',
    user_id : '',
    loading : false,
    isValid : false,
    invalid : false,
    error : false,
    errorMsg : '',
    empty : false
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
    setUser({...user, code : event.target.value, invalid : false, empty : false})
}
const verifyCode = event => {
    event.preventDefault();
    setUser({...user, loading : true})
    
    const {contextValues} = context
    const datas = {
        firstname : contextValues.firstname,
        lastname : contextValues.lastname,
        password : contextValues.password,
        email : contextValues.email 
    }
    if (user.code !== context.contextValues.code.toString()) {
        setUser({...user, loading : false, invalid : true})
    } else {
        setTopContext(user)
        create(datas).then(data => {
            if (data.error) {
                setUser({...user, loading : false, error : true, errorMsg : data.error})
            } else {
                console.log(data, 'no error')
                setUser({...user, loading : false})
            }
        })
    }
}

const {isValid} = user
if (isValid) {
    return (
        <Redirect to={{
                pathname :`/freelancer/fill/profile/type-workers/${Date.now()}/${user.lastname}/e/`,
                state : {user}
            }}/>
    )
}
const closeX = event => {
    event.preventDefault();
    setUser({...user, error : !user.error})
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
                        <p className='text-danger'>{user.invalid ? 'Code invalid please check again!' : ''}</p>
                        <p className='text-danger'>{user.empty ? 'Please fill in the code!' : ''}</p>
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
export default EmailVerifacation;