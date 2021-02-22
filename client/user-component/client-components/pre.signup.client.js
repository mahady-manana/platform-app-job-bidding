import React,{useState} from 'react';
import {Input} from './utility';
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
                       <Input type="text"
                              Name="firstname"
                              labelName="First Name"
                              placeholder="Enter firstname"
                       />

                        <Input type="text"
                                name="last name"
                                labelName="Laste Name"
                                placeholder="Enter lastname"
                        />
                        <Input type="email"
                                name="email"
                                labelName="Email"
                                placeholder="Enter Email"
                        />
                        <Input type="password"
                                name="password"
                                labelName="Password"
                                placeholder="Enter password"
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