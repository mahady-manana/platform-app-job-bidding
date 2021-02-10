import React, {useState, useEffect} from 'react';
import {Input, Textarea} from '../../utils/formUtility';

const Experience = props => {
const [values, setValues] = useState({
    title : '',
    school : '',
    degree : '',
    date_bg : '',
    date_end : '',
    description : '',
})
const [isAllFilled, setFilled] = useState(false)
const CheckIfFilled = () => {
    if (values.title.length > 10  && values.school !== '' && values.date_bg !== '' && values.date_end !== '') {
        setFilled(true)
    } else {
        setFilled(false)
    }
}
const classIfEnable = () => {
    if (!isAllFilled) {
        return 'disabled'
    } else {
        return 'enable'
    }
}
const handleChange = name => event => {
    event.preventDefault();
    const val = event.target.value;
    setValues({...values, [name] : val})
    CheckIfFilled()
    classIfEnable()
}
const handleEducationFields = event => {
    event.preventDefault();
    const education_data = {
        title : values.title,
        school : values.school,
        degree : values.degree,
        date_bg : values.date_bg,
        date_end : values.date_end,
        description : values.description
    }
    props.save(education_data)
    setValues({
        title : '',
        school : '',
        degree : '',
        date_bg : '',
        date_end : '',
        description : ''
    })

}
return (
<div className='popup-content'>
<div className='form-education'>
<div className='professionnal-title'>
                                <h4>Education :</h4>
                            </div>
                            <div className='education-title'>
                                <Input name='title'
                                    type='text'
                                    labelName='Title or Fields : * (min 10 caracters)'
                                    placeholder=''
                                    value={values.title}
                                    onChange={handleChange('title')}
                                    />
                            </div>
                            <div className='education-title'>
                                <Input name='degree'
                                    type='text'
                                    labelName='Degree : * (min 10 caracters)'
                                    placeholder=''
                                    value={values.degree}
                                    onChange={handleChange('degree')}
                                    />
                            </div>
                            <div className='carrer-school'>
                                <Input name='school'
                                    type='text'
                                    labelName='School : *'
                                    placeholder=''
                                    value={values.school}
                                    onChange={handleChange('school')}
                                    />
                            </div>
                            <div className='row date'>
                                <div className='col-sm-6'>
                                    <div className='begin-date'>
                                        <Input name='date_bg'
                                            type='date'
                                            labelName='Start : *'
                                            placeholder=''
                                            value={values.date_bg}
                                            onChange={handleChange('date_bg')}
                                            />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='inner'>
                                        <Input name='date_end'
                                                    type='date'
                                                    labelName='End : *'
                                                    placeholder=''
                                                    value={values.date_end}
                                                    onChange={handleChange('date_end')}
                                                    />                              
                                    </div>                                   
                                </div>
                            </div>
                            
                            <div className='description'>
                                <Textarea name='description'
                                    rows='5'
                                    cols='20'
                                    labelName='Description : '
                                    placeholder=''
                                    value={values.description}
                                    onChange={handleChange('description')}
                                    />
                            </div>
                            <div className='finishandsave'>
                                <button className={`btn default-2 ${classIfEnable()}`} onClick={handleEducationFields} disabled={isAllFilled ? false : true || true}>Save</button>
                                <p className='text-danger text-left'>* : Fields required</p>
                            </div>
</div>
</div>
)
}
export default Experience