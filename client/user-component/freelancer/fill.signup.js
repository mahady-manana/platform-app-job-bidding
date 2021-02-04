import React, {useState} from 'react';

const FillSignup = () => {

const [values, setValues] = useState({
    firstname : '',
    lastname : '',
    job_title : '',
    description : ''
})
const [isFilled, setFilled] = useState(false)

const handleChange = event => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setValues({...values, [name] : value})
}
const classToFilled = () => {
    if (isFilled) {
        return 'input-filled'
    } else {
        return 'input-not-filled'
    }
}
return (
<>
<div className='edit-profile'>
    <div className ='entry'>
        <div className='contaier'>
            <h3>Fill out your profile</h3>
        </div>
        <form>
        <section className='section'>
            <div className='inner-section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='inner-col'>
                             
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className='inner-col'>
                                <div className='row'>
                                    <div className='col-6'>                                        
                                        <div className={`form-group ${classToFilled()}`}>
                                            <input type="text" className="form-control" placeholder="First Name"/>
                                        </div>
                                    </div>
                                    <div className='col-6'>                                        
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Last Name"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </form>
    </div>
</div>
</>
)
}
export default FillSignup;