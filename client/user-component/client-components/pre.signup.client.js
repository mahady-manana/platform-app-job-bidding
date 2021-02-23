import React,{useState} from 'react';
import {Input} from './utility';

const ClientPreSignup = () => {
    const[values, setValues]= useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
    })

  const handleChange=name=>event=>{
       event.preventDefault()
       const val = event.target.value;
       setValues({...values,[name]:val})

  }
  const handleSubmit=event=>{
        event.preventDefault()
        console.log(values)
  }
return (
<>
<div className='pre-signup'>
    <div className='entry'>
    <section className='section'>
        <div className='inner-section'>
            <div className='container'>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                       <Input type="text"
                              name="firstname"
                              labelName="First Name"
                              placeholder="Enter firstname"
                              value={values.firstname}
                              onChange={handleChange('firstname')}

                       />

                        <Input type="text"
                                name="last name"
                                labelName="Laste Name"
                                placeholder="Enter lastname"
                                value={values.lastname}
                                onChange={handleChange('lastname')}
                        />
                        <Input type="email"
                                name="email"
                                labelName="Email"
                                placeholder="Enter Email"
                                value={values.email}
                                onChange={handleChange('email')}
                        />
                        <Input type="password"
                                name="password"
                                labelName="Password"
                                placeholder="Enter password"
                               value={values.password}
                               onChange={handleChange('password')}
                        />
                        <button type="submit" className="btn default-1">Save and next</button>
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