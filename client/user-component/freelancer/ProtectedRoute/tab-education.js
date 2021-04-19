import React from 'react';

export const TabEducation = props => {
return (
<>
<div className='education_tab'>
    <span onClick={props.update} className='edit-icon'><i className='fas fa-marker'></i></span>
    <h4 className='title'><i aria-hidden className='tab-icon fa fa-graduation-cap'></i> {props.item.title}</h4>
    <p><span className='school'><i aria-hidden className='tab-icon fa fa-school'></i>  {props.item.school}</span> - From : <span className='date_educ'>{props.item.date_bg}</span> - <span className='date_educ'> {props.item.date_end}</span></p>
    <div className='degree_educ'><i aria-hidden className='tab-icon fa fa-user-graduate'></i>  Degree : {props.item.degree}</div>
    <div className='description'>{props.item.description}</div>
</div>
</>
)
}