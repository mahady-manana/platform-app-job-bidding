import React, { useState, useContext} from "react";
import { TopContext } from "../TopContext";
import Auth from "./auth/auth.api";
import { signin } from "./auth/router.api";

const Login = () => {

const {setTopContext} = useContext(TopContext) 

const [logger, setLogger] = useState({
    email : '',
    password : ''
})

const handleChange = name => event => {
    event.preventDefault();
    const values = event.target.value;
    setLogger({...logger, [name] : values})
}

const handleLogin = event => {
    event.preventDefault();
    signin(logger).then(data => {
        if (data.error) {
            console.log(data)
        } else {
            Auth.authenticate(data, () => {
                setTopContext(data.user)
                console.log(data)
            })
            
        }
    })
}
return (
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
                    <button type="submit" className="btn default-1">Login </button>
                </form>
            </div>
        </div>
        </div>
    </section>
</div>
)
}
export default Login;
