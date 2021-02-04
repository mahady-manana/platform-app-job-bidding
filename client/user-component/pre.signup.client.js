import React from 'react';

const ClientPreSignup = () => {
return (
<>
<div className='pre-signup'>
    <div className='entry'>
    <section className='section'>
        <div className='inner-section'>
            <div className='container'>
                <div className="form-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email address:</label>
                            <input type="email" className="form-control" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" placeholder="Enter password"/>
                        </div>
                        <button type="submit" className="btn default-1">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </div>
</div>
</>
)
}
export default ClientPreSignup;