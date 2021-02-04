import React from "react";
const Login = () => {
return (
<div className="login">
    <section className="section" style={{background : 'url(/images/login-bg.jpg)'}}>
        <div className='inner-section' style={{height : '80vh'}}>
        <div className='container'>
            <div className="form-container">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address :</label>
                        <input type="email" className="form-control" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password :</label>
                        <input type="password" className="form-control" placeholder="Enter password"/>
                    </div>
                    <button type="submit" className="btn default-1">Login</button>
                </form>
            </div>
        </div>
        </div>
    </section>
</div>
)
}
export default Login;
