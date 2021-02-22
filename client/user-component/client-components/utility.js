
import React from "react";

export
const Input = ({type,name,value,onChange,labelName,placeholder}) => {
return (
    <div className="form-group">
        <label htmlFor="{name}">{labelName}</label>
        <input type={type} className="form-control" placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
)
}

