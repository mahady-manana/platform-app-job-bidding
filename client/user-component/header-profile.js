import React, {useContext, useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TopContext } from '../TopContext';
import Auth from './auth/auth.api';
import { signout } from './auth/router.api';


const HeaderProfile = () => {

const [user, setUser] = useState({
    firstname : '',
    lastname : '',
    user_id : ''
})
const [logout, setToLogout] = useState(false);
const {topContext, setTopContext} = useContext(TopContext);

useEffect(() => {
    let cleanup = false;
    if (Auth.isAuthenticated()) {
        const userInfos = Auth.isAuthenticated().user;
        setUser({
            ...user,
            firstname : userInfos.firstname,
            lastname : userInfos.lastname,
            user_id : userInfos._id
        })
    }
    return () => {
        cleanup = true
    }
}, [])
const handleLogout = event => {
    event.preventDefault();
    signout().then(res => {
        
        setToLogout(true);
        Auth.clearJWT(() => {
            setTopContext({
                firstname : '',
                lastname : '',
                avatar : ''
            })
        })
    })
}

if (logout) {
    return (<Redirect to={{
        pathname : '/'
    }}/>)
}
return (
<div className="profile-header">
    <div className="profile-container">
        <div className='row'>
            <div className='col col-8'>
                <div className='infos-user'>
                    <p className='greeting'>Hello {user.firstname} {user.lastname}</p>
                    <div className='btn-collapsed'>
                        <Link to='/freelancer/dashbord'><span className='btn view-profile'>Profile</span></Link>
                        <Link to={'/freelancer/settings/profile/edit/' + user.user_id }><span className='btn view-settings'>Settings</span></Link>
                        <span className='btn logout-btn' onClick={handleLogout}>Log out</span>
                    </div>
                </div>
            </div>
            <div className='col col-4'>
                <div className='avatar-top'>

                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default HeaderProfile;