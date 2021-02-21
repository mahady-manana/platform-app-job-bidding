import React, {useState, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {FreelancerContext} from './FreelancerContext';

const FreelancerPreSignup = () => {

const context = useContext(FreelancerContext);

const [infos, setInfos] = useState({
    email : '',
    password : '',
    firstname : '',
    lastname : '',
    isFilled : false,
    error : '',
    loading : false,
    code : Math.floor(100000 + Math.random() * 999999)
})
const handleChange = event => {
    event.preventDefault();
    const name = event.target.name;
    const values = event.target.value;
    setInfos({...infos, [name] : values, error : ''})
}
const saveAndNext = event => {
    event.preventDefault();
    if (infos.password.length < 8 || infos.firstname === '' || infos.lastname === '' || infos.email === '') {
       setInfos({...infos, error : 'All fields is required and Password must be at last 8 caracters'})
    } else {
        setInfos({...infos, loading : true})
        const data = {
            email : infos.email,
            code : infos.code,
            firstname : infos.firstname,
            lastname : infos.lastname
        }
        context.setContextValues(infos)
        axios.post('/user/post/email/verify/', data).then(res => {
            setInfos({...infos, loading : false, isFilled : true})
        }).catch(err => setInfos({...infos, error : err}))
    }
      
}

const {isFilled} = infos
if (isFilled) {
    return (
        <Redirect to={{
            pathname :`/freelancer/user/signup/verification/${infos.firstname}/${infos.lastname}/v/`,
            }}/>
    )
}
const Test = event => {
    event.preventDefault();
    // const cnt = context.contextValues;
    const {contextValues} = context;
    // const cnt = context.contextValues;
    console.log(contextValues)
}
return (
<>
<div className='pre-signup'>
    <div className='entry'>
    <section className='section'>
        <div className='inner-section'>
            <div className='container'>
                <h3>Signup as a Freelancer...</h3>
                <button onClick={Test}>Click</button>
                <div className="form-container">
                    <p className='text-info'>* All fields is required</p>
                    <form onSubmit={saveAndNext}>
                        <div className="form-group">
                            <label htmlFor="firstname">Firstname : *</label>
                            <input type="text" className="form-control" name='firstname' value={infos.firstname} onChange={handleChange}/><br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Lastname : *</label>
                            <input type="text" className="form-control" name='lastname' value={infos.lastname} onChange={handleChange}/><br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address: *</label>
                            <input type="email" className="form-control" name='email' value={infos.email} onChange={handleChange}/><br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: * (<em>Password must be at last 8 caracters</em>)</label>
                            <input type="password" className="form-control" name='password' value={infos.password} onChange={handleChange}/><br/>
                            <p className='text-danger'>{infos.error}</p>
                        </div>
                        <button type="submit" className='btn default-1 enable'>Save & Next</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </div>
</div>
<div className={`loading-popup ${infos.loading ? '' : 'closex'}`}>
        <span className='loading-icon'>Processing...</span>
</div>
</>
)
}
export default FreelancerPreSignup;