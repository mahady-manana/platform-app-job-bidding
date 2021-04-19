import React, {useState, useContext} from 'react';
import {Input} from './utility';
import {ContextClient} from './ContextClient'

const ClientPreSignup = () => {
// useContext
const context = useContext(ContextClient)

const [values, setValues] = useState({
    firstname : '',
    lastname : '',
    email : '',
    password : ''
})
const handleChange = name => event => {
    event.preventDefault();
    const val = event.target.value;
    setValues({...values, [name] : val})
}
const handleSubmit = event => {
    event.preventDefault();
    context.setContextValues(values);
    console.log(values)
}
const Test = event => {
    event.preventDefault();
    console.log(context.contextValues)
}
return (
<>
<div className='pre-signup'>
    <div className='entry'>
    <section className='section'>
        <div className='inner-section'>
            <div className='container'>
                <div className="form-container">
                    <button onClick={Test}>Test</button>
                    <form onSubmit={handleSubmit}>
                        <Input type='text' 
                               name="firstname"
                               labelName="First Name : "
                               placeholder='Enter firstname'
                               values = {values.firstname}
                               onChange={handleChange('firstname')}/>
                        <Input type='text' 
                               name="lastname"
                               labelName="Last Name : "
                               placeholder='Enter lastname'
                               values = {values.lastname}
                               onChange={handleChange('lastname')}/>
                        <Input type='email' 
                               name="email"
                               labelName="Email : "
                               placeholder='Enter email'
                               values = {values.email}
                               onChange={handleChange('email')}/>
                        <Input type='password' 
                               name="password"
                               labelName="Password : "
                               placeholder='Enter password'
                               values = {values.password}
                               onChange={handleChange('password')}/>
                        
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
export default ClientPreSignup;