import React, { useState, useContext} from "react";
import { Redirect } from "react-router-dom";
import { TopContext } from "../TopContext";
import Auth from "./auth/auth.api";
import { signin } from "./auth/router.api";

const Login = () => {

const {setTopContext} = useContext(TopContext) 

const [logger, setLogger] = useState({
    email : '',
    password : '',
    isValid : false,
    error : false,
    loading : false
})

const handleChange = name => event => {
    event.preventDefault();
    const values = event.target.value;
    setLogger({...logger, [name] : values, error : false})
}

const handleLogin = event => {
    event.preventDefault();
    setLogger({...logger, loading : true})
    signin(logger).then(data => {
        if (data && data.error) {
            setLogger({...logger, loading : false, error : data.error})
        } else {
            Auth.authenticate(data, () => {
                setLogger({...logger, loading : false ,isValid : true})
                setTopContext(data.user)
            })
        }
    })
}
const {isValid} = logger;
if (isValid) {
    return (
        <Redirect to={{
            pathname : '/freelancer/profile/view/'
        }}/>
    )
}
return (
<>
<div className="login">
    <section className="section" style={{background : 'url(/images/login-bg.jpg)'}}>
        <div className='inner-section' style={{height : '80vh'}}>
        <div className='container'>
            <div className="form-container">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email address :</label>
                        <input type="email" className="form-control" placeholder="Enter email" value ={logger.email} onChange={handleChange('email')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password :</label>
                        <input type="password" className="form-control" placeholder="Enter password" value ={logger.password} onChange={handleChange('password')}/>
                    </div>
                    <p className='text-danger'>
                        {
                            logger.error
                            // logger.error ? 'Email & Password Error : Login invalid' : ''
                        }
                    </p>
                    <button type="submit" className="btn default-1">Login </button>
                </form>
            </div>
        </div>
        </div>
    </section>
</div>
<div className={`loading-popup ${logger.loading ? '' : 'closex'}`}>
        <span className='loading-icon'>Processing...</span>
</div>
</>
)
}
export default Login;
