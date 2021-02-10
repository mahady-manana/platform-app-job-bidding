import React from 'react';

const Input = ({placeholder, onBlur, type, name, value, onChange, className, labelName}) => {
return (
<div className="form-group">
    <label htmlFor={name}>{labelName}
        <input type={type}
                className={`form-control ${className ? className : ''}`} 
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
<div className="form-group">
    <label htmlFor={name}>{labelName} 
        <textarea
                className={`form-control ${className ? className : ''}`} 
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