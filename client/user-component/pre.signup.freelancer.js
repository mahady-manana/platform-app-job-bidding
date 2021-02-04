import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

const FreelancerPreSignup = props => {

const [infos, setInfos] = useState({
    email : '',
    password : '',
    isFilled : false
})
const handleChange = event => {
    event.preventDefault();
    const name = event.target.name;
    const values = event.target.value;
    setInfos({...infos, [name] : values})
}
const saveAndNext = event => {
    event.preventDefault();
    const presave = {
        email : infos.email,
        password : infos.password
    }
    setInfos({isFilled : true})
}
const {isFilled} = infos
if (isFilled) {
    return (
        <Redirect to='/fill/3/profile/'/>
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
                            <input type="email" className="form-control" name='email' value={infos.email} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" name='password' value={infos.password} onChange={handleChange}/>
                        </div>
                        <button type="submit" className="btn default-1">Save & Next</button>
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
export default FreelancerPreSignup;