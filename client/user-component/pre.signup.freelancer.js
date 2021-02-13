import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const FreelancerPreSignup = props => {

const [infos, setInfos] = useState({
    email : '',
    password : '',
    isFilled : false,
    error : '',
    linking : 'http://localhost:5555/fill/3/profile/',
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
    if (infos.password.length < 8) {
       setInfos({...infos, error : 'Password must be at last 8 caracters'})
    } else {
        setInfos({...infos, loading : true})
        const data = {
            email : infos.email,
            code : infos.code,
            linking : infos.linking
        }
        axios.post('/user/post/email/verify/', data).then(res => {
            setInfos({...infos, loading : false, isFilled : true})
        
        }).catch(err => console.log(err))
    }
}
const {isFilled} = infos
if (isFilled) {
    return (
        <Redirect to={{
            pathname :'/user/signup/verification/',
            state : {infos}
            }}/>
    )
}
return (
<>
<div className='pre-signup'>
    <div className='entry'>
    <section className='section'>
        <div className='inner-section'>
            <div className='container'>
                <h3>Signup as a Freelancer...</h3>
                <div className="form-container">
                    <form onSubmit={saveAndNext}>
                        <div className="form-group">
                            <label htmlFor="email">Email address:</label>
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