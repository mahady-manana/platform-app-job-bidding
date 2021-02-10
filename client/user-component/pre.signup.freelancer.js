import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';

const FreelancerPreSignup = props => {

const [infos, setInfos] = useState({
    email : '',
    password : '',
    isFilled : false,
})
const [btndisabled, setDisabled] = useState(false)
const checkIfCompleted = () => {
    if (infos.email !== '' && infos.password.length > 8) {
        setDisabled(true)
    } else {
        setDisabled(false)
    }
}
const handleChange = event => {
    event.preventDefault();
    const name = event.target.name;
    const values = event.target.value;
    setInfos({...infos, [name] : values})
    checkIfCompleted()
}
 
const saveAndNext = event => {
    event.preventDefault();
    setInfos({...infos, isFilled : true})
}
const {isFilled} = infos
if (isFilled) {
    return (
        <Redirect to={{
            pathname :'/fill/3/profile/',
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
                        </div>
                        <button type="submit" className={`btn default-1 ${btndisabled ? 'enable' : 'disabled'}`} disabled={btndisabled ? false : true}>Save & Next</button>
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