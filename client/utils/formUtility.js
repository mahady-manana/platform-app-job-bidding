import React from 'react';

const Input = ({placeholder, onBlur, type, name, value, onChange, className, labelName, fa}) => {
return (
<div className="custom-form">
    <label htmlFor={name} className={className}><i aria-hidden className={`fas ${fa}`}></i>{labelName}
        <input type={type}
                className='form-input' 
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}/>
    </label>
</div>
)
}
const Textarea = ({placeholder,onBlur, rows, cols, name, value, onChange, className, labelName}) => {
return (
<div className="custom-form">
    <label htmlFor={name} className={className}>{labelName} 
        <textarea
                className= 'form-textarea'
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                rows={rows}
                cols={cols}>
        </textarea>
    </label>
</div>
)
}

export {
    Input,
    Textarea
}