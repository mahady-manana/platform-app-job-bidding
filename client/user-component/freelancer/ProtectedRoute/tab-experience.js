import React from 'react';

export const TabExperience = props => {
return (
<>
<div className='experience_tab'>
    <span onClick={props.update} className='edit-icon'><i className='fas fa-marker'></i></span>
    <h4 className='title'><i aria-hidden className='tab-icon fa fa-briefcase'></i> {props.item.title}</h4>
    <p><span className='company'><i aria-hidden className='tab-icon fa fa-building'></i> 
        {props.item.company}</span> - From : <span className='date_experience'>{props.item.date_bg}</span> - 
        <span className='date_experience'> {props.item.date_end}</span></p>
    <div className='description_experience'>{props.item.description}</div>
</div>
</>
)
}