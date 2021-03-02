import React, {useContext, useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CheckNewSignupContext } from '../SharedRouter';
import { TopContext } from '../TopContext';
import Auth from './auth/auth.api';
import { signout } from './auth/router.api';


const HeaderProfile = () => {

const [user, setUser] = useState({
    firstname : '',
    lastname : '',
    profilePhoto : '',
    user_id : ''
})
const [logout, setToLogout] = useState(false);
const {setTopContext} = useContext(TopContext);
const {loginAndLogoutContext,setLoginAndLogoutContext} = useContext(CheckNewSignupContext);
useEffect(() => {
    let cleanup = false;
    if (Auth.isAuthenticated()) {
        const userInfos = Auth.isAuthenticated().user;
        setUser({
            ...user,
            firstname : userInfos.firstname,
            lastname : userInfos.lastname,
            profilePhoto : userInfos.photo, 
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
            setLoginAndLogoutContext(!loginAndLogoutContext);
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
                        <Link to='/freelancer/profile/view/'><span className='btn view-profile'>Profile</span></Link>
                        <Link to={'/freelancer/profile/settings/' }><span className='btn view-settings'>Settings</span></Link>
                        <span className='btn logout-btn' onClick={handleLogout}>Log out</span>
                    </div>
                </div>
            </div>
            <div className='col col-4'>
                <div className='avatar-top'>
                    <img src={
                        (user.profilePhoto === '' ||user.profilePhoto === undefined ) ? '/images/icon.png' : `/uploads/profile/${user.profilePhoto}`
                    } alt={`${user.firstname} ${user.lastname}`}/>
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default HeaderProfile;