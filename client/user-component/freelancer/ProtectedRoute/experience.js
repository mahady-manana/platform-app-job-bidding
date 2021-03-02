import React, {useState, useEffect, useContext} from 'react';
import {Input, Textarea} from '../../../utils/formUtility';
import { ContextForIndexSign } from './profile-settings';

const Experience = props => {
const {contextForIndex} = useContext(ContextForIndexSign);
const [values, setValues] = useState({
    title : '',
    company : '',
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
            company : '',
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
            company : data.company || '',
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
    if (values.title.length !== ''  && values.company !== '' && values.date_bg !== '' && values.date_end !== '') {
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
const handleExperienceFields = event => {
    event.preventDefault();
    const experience_data = {
        title : values.title,
        company : values.company,
        date_bg : values.date_bg,
        date_end : values.date_end,
        description : values.description
    }
    props.save(experience_data, values.update, values.index)
    setValues({
        title : '',
        company : '',
        date_bg : '',
        date_end : '',
        description : ''
    })

}
return (
<div className='popup-content'>
<div className='form-experience'>
<div className='professionnal-title'>
                                <h4>Experience :</h4>
                            </div>
                            <div className='carrer-title'>
                                <Input name='title'
                                    type='text'
                                    fa='fa-briefcase'
                                    placeholder='Your job title'
                                    value={values.title}
                                    onChange={handleChange('title')}
                                    />
                            </div>
                            <div className='carrer-company'>
                                <Input name='company'
                                    type='text'
                                    fa='fa-building'
                                    placeholder='Company'
                                    value={values.company}
                                    onChange={handleChange('company')}
                                    />
                            </div>
                            <div className='row date'>
                                <div className='col-sm-6'>
                                    <div className='begin-date'>
                                        <span>Date start</span>
                                        <Input name='date_bg'
                                            type='date'
                                            fa='fa-calendar-plus'
                                            placeholder='Start date >>>'
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
                                                    placeholder='End date'
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
                                <button className={`btn default-2 ${classIfEnable()}`} onClick={handleExperienceFields} disabled={isAllFilled ? false : true || true}>Save</button>
                                <p className='text-danger text-left'>* : Fields required</p>
                            </div>
</div>
</div>
)
}
export default Experience