import React from 'react';


export const ListUserAvailable = props => {
return (
<>
    <li className='user-available'>
        <span className={`user-status ${props.user.status}`}></span>
        {props.user.firstname} {props.user.lastname}
    </li>
</>
)
}
 