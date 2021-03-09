import React, {useEffect, useState, useContext} from 'react';
import { CheckNewSignupContext } from '../../../SharedRouter';
import { read } from '../../api/api-client';
import Auth from '../../auth/auth.api';

export const Profile = () => {
const [user, setUser] = useState({
    email : '',
    firstname : '',
    lastname : '',
    company : '',
    description : '',
    company_address : '',
    city : '',
    country : '',
    skill : [],
    photo : '',
    user_id : '',
    facebook : '',
    linkedin : '',
    twitter : '',
    github : '',
})
const {loginAndLogoutContext, setLoginAndLogoutContext} = useContext(CheckNewSignupContext)

useEffect(() => {
    let abortController = new AbortController();
    setLoginAndLogoutContext(!loginAndLogoutContext)
    const jwtAuth = Auth.isAuthenticated();
    read(jwtAuth.user._id, jwtAuth.token, abortController.signal)
        .then(data => {
            setUser({
                ...user,
                email : data.email,
                user_id : data._id,
                photo : data.photo,
                description : data.description,
                firstname : data.firstname,
                lastname : data.lastname,
                company : data.company,
                company_address : data.company_address,
                city : data.city,
                country : data.country,
                skill : data.skill || [],
                facebook : data.facebook,
                linkedin : data.linkedin,
                twitter : data.twitter,
                github : data.github,
            })
        })
    return () => abortController.abort();
}, [])

return (
<>
<div className='user-dashbord type-client'>
<div className="inner-content">
    <section className="section">
        <div className="inner-section">
            <div className="container">
                <div className="info_warn_promo">
                    <p>Here are some info, warning, promo and more in short line.</p>
                </div>
            </div>
        </div>
    </section>
    <section className="section">
        <div className="inner-section">
            <div className="container">
                <div className="row row_two_col">
                    <div className="col-left col-sm-4">
                        <div className="col-inner profile-tab-dashbord">
                            <div className='profile-infos'>
                                <div className='image-container'>
                                    <img src= {
                                        (user.photo === '' || user.photo === undefined) ? '/images/icon.png' : user.photo
                                    } alt='' className='photo' width='150px' height='150px'/>
                                </div>
                                <div className='perso-infos'>
                                    <div className='social'>
                                        <a className='link-social' nofollow='true' noreferer='true' href={user.linkedin} target='_blank'><i className='fab fa-linkedin-in'></i></a>
                                        <a className='link-social' nofollow='true' noreferer='true' href={user.facebook} target='_blank'><i className='fab fa-facebook-f'></i></a>
                                        <a className='link-social' nofollow='true' noreferer='true' href={`https://twitter.com/${user.twitter}`} target='_blank'><i className='fab fa-twitter'></i></a>
                                        <a className='link-social' nofollow='true' noreferer='true' href={user.github} target='_blank'><i className='fab fa-github'></i></a>
                                    </div>
                                </div>
                                <div className='title'>
                                    <span>{user.company}</span>
                                </div>
                                <div className='address'>
                                    <p>{user.city}, {user.country}</p>
                                </div>
                                <div className='bid'>
                                    <h3>Bid available : 10 bid</h3>
                                    <p>GoPro to get unlimited Bid</p>
                                </div>
                                <div className='skills'>
                                    <h3>Skills :</h3>
                                    <div className='skill-list'>
                                        {
                                            user.skill.map((item, index) => {
                                                return (
                                                    <span className='item' key={index}>#{item}</span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-right col-sm-8 col-rigth-infos">
                        <div className="inner-col grid-infos-items">
                            <div className="gird-infos-item personnal-infos">
                                <div className='row'>
                                    <div className='col-sm-9'>
                                        <h1 className='fullname'>{`${user.company}`}</h1>
                                        <h2 className='personnal-title'>{user.firstname} {user.lastname}</h2>
                                        <p>{user.company_address}</p>
                                    </div>
                                </div>
                                <div className='full-description'>
                                    <div>{user.description}</div>
                                </div>
                            </div>
                            <div className='gird-infos-item full-skills'>
                                <h3>Researched Skills</h3>
                                <div className='skill-list'>
                                    {
                                        user.skill.map((item, index) => {
                                            return (
                                                <span key={index} className='item-skill'>{item}</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</div>
</>
)
}

