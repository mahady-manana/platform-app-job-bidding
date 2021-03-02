import React, {useState, useEffect, useContext} from 'react';
import {Input, Textarea} from '../../../utils/formUtility';
import {ContextForIndexSign} from './profile-settings';

const Experience = props => {
const {contextForIndex} = useContext(ContextForIndexSign);

const [values, setValues] = useState({
    title : '',
    school : '',
    degree : '',
    date_bg : '',
    date_end : '',
    description : '',
    update : false,
    index : ''
})
useEffect(() => {
    let cleanup = false;
    if (contextForIndex === undefined) {
        setValues({
            title : '',
            school : '',
            degree : '',
            date_bg : '',
            date_end : '',
            description : '',
            update : false,
            index : ''
        })
    }  else {
        const {data} = contextForIndex
        setValues({
            title : data.title || '',
            school : data.school || '',
            degree : data.degree || '',
            date_bg : data.date_bg || '',
            date_end : data.date_end || '',
            description : data.description || '',
            update : true,
            index : contextForIndex.index
        })
    }   
    return () => {
        cleanup = true
    }
}, [contextForIndex])
const [isAllFilled, setFilled] = useState(false)
const CheckIfFilled = () => {
    if (values.title.length !== ''  && values.school !== '' && values.date_bg !== '' && values.date_end !== '') {
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
    props.save(education_data, values.update, values.index)
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
                                    fa='fa-graduation-cap'
                                    placeholder='Title or fields'
                                    value={values.title}
                                    onChange={handleChange('title')}
                                    />
                            </div>
                            <div className='education-title'>
                                <Input name='degree'
                                    type='text'
                                    fa='fa-user-graduate'
                                    placeholder='Degree or Certificate'
                                    value={values.degree}
                                    onChange={handleChange('degree')}
                                    />
                            </div>
                            <div className='carrer-school'>
                                <Input name='school'
                                    type='text'
                                    fa='fa-school'
                                    placeholder='School or Formation Center'
                                    value={values.school}
                                    onChange={handleChange('school')}
                                    />
                            </div>
                            <div className='row date'>
                                <div className='col-sm-6'>
                                    <div className='begin-date'>
                                        <span>Date start</span>
                                        <Input name='date_bg'
                                            type='date'
                                            fa='fa-calendar-plus'
                                            placeholder=''
                                            value={values.date_bg}
                                            onChange={handleChange('date_bg')}
                                            />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='inner'>
                                        <span>Date End</span>
                                        <Input name='date_end'
                                                    type='date'
                                                    fa='fa-calendar-plus'
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
                                    placeholder='Description'
                                    value={values.description}
                                    onChange={handleChange('description')}
                                    />
                            </div>
                            <div className='finishandsave'>
                                <p className='text-right mc-2'>Fill in all fields to enable save button.</p>
                                <button className={`btn default-2 ${classIfEnable()}`} onClick={handleEducationFields} disabled={isAllFilled ? false : true || true}>Save</button>
                                <p className='text-danger text-left'>* : Fields required</p>
                            </div>
</div>
</div>
)
}
export default Experience