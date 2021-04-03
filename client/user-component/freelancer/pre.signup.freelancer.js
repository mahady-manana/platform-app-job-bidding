import React, {useState, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import {FreelancerContext} from './FreelancerContext';
import { TopContext } from '../../TopContext';
import { Input } from '../../utils/formUtility';
import { sendEmail } from '../api/api-freelancer';
import { CheckerSignup } from '../auth/router.api';

const FreelancerPreSignup = () => {

const context = useContext(FreelancerContext);
const {setTopContext} = useContext(TopContext)
const [infos, setInfos] = useState({
    email : '',
    password : '',
    firstname : '',
    lastname : '',
    isFilled : false,
    error : '',
    userChecker : '',
    loading : false,
    code : Math.floor(100000 + Math.random() * 999999)
})
const handleChange = name => event => {
    event.preventDefault();
    const values = event.target.value;
    setInfos({...infos, [name] : values, error : ''})
}
const saveAndNext = event => {
    event.preventDefault();
    if (infos.password.length < 8 || infos.firstname === '' || infos.lastname === '' || infos.email === '') {
       setInfos({...infos, error : 'All fields is required and Password must be at last 8 caracters'})
    } else {
        setInfos({...infos, loading : true})
        const data_infos = {
            email : infos.email,
            code : infos.code,
            firstname : infos.firstname,
            lastname : infos.lastname
        }
        CheckerSignup({email : infos.email}).then(
            data => {
                if (data && data.error) {
                    setInfos({...infos, userChecker : data.error, loading : false})
                } else {
                    context.setContextValues(infos)
                    setTopContext(infos)
                    sendEmail(data_infos).then(res => {
                        if (res.error) {
                            setInfos({...infos, loading : false, isFilled : true})
                        }
                        setInfos({...infos, loading : false, isFilled : true})
                    })
                }
            }
        )  
    }   
}

const {isFilled} = infos
if (isFilled) {
    return (
        <Redirect to={{
            pathname :`/freelancer/user/signup/verification/${Date.now()}/`,
            }}/>
    )
}
return (
<>
<div className='pre-signup freelancer'>
    <div className='entry'>
    <section className='section'>
        <div className='inner-section'>
            <div className='signup-container container'>
                <div className='signup-inner row'>
                    <div className='col-sm-5 col-form-left'>
                        <div className="form-container">
                            <p className='text-info'>* All fields is required</p>
                            <p className='text-danger'>{infos.userChecker}</p>
                            <form onSubmit={saveAndNext}>
                                <Input className = 'name'
                                       type ='text'
                                       fa = 'fa-user-edit'
                                       name = 'firstname'
                                       placeholder = 'First name'
                                       value = {infos.firstname}
                                       onChange = {handleChange('firstname')}/>
                                       
                                <Input className = 'name'
                                       type ='text'
                                       fa = 'fa-user-edit'
                                       name = 'lastname'
                                       placeholder = 'Last name'
                                       value = {infos.lastname}
                                       onChange = {handleChange('lastname')}/>
                                <Input className = 'email'
                                       type ='email'
                                       name = 'email'
                                       fa = 'fa-envelope-open-text'
                                       placeholder = 'Email'
                                       value = {infos.email}
                                       onChange = {handleChange('email')}/>
                                <Input className = 'password'
                                       type ='password'
                                       name = 'password'
                                       fa = "fa-lock"
                                       placeholder = 'Password'
                                       value = {infos.password}
                                       onChange = {handleChange('password')}/>
                                <p className='info-privacy mc-3'>By creating an account at Go-Inside you accept our terms of use and Privacy Policy.</p>
                                <p className='text-danger'>{infos.error}</p>
                                <button type="submit" className='btn default-1 submit'>Save & Next</button>
                            </form>
                        </div>
                    </div>
                    <div className='col-sm-7 col-content-right' style={{background : `url(/images/bg-signup1.jpg) no-repeat center`}}>
                        <div className='inner-right'>
                            <h2>Be the number 1 at Go Inside</h2>
                            <h3>Some of your benefits</h3>
                            <p className='text-center'>Lorem ipsum dolor sit, 
                            amet consectetur adipisicing elit. Hic eius vero, nulla, 
                            ullam doloremque facilis quod in, totam consequatur commodi 
                            voluptatibus ducimus asperiores cum at? Vitae totam et nam aut.</p>
                        </div>
                    </div>
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