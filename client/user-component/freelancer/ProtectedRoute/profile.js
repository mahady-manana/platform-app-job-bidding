import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, {useEffect, useState, useContext} from 'react';
import { CheckNewSignupContext } from '../../../SharedRouter';
import Auth from '../../auth/auth.api';
import { read } from '../../auth/router.api';
import {SkillsOptions} from './skills_options';

export const Profile = () => {
const [user, setUser] = useState({
    email : '',
    firstname : '',
    lastname : '',
    job_title : '',
    description : '',
    hourly_rate : '',
    city : '',
    country : '',
    skill : [],
    education : [],
    experience : [],
    photoName : '',
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
                photoName : data.photo,
                description : data.description,
                firstname : data.firstname,
                lastname : data.lastname,
                job_title : data.job_title,
                hourly_rate : data.hourly_rate,
                city : data.city,
                country : data.country,
                skill : data.skill || [],
                education : data.education || [],
                experience : data.experience || [],
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
<div className='user-dashbord type-freelancer'>
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
                                        (user.photoName === '' || user.photoName === undefined) ? '/images/icon.png' : `/uploads/profile/${user.photoName}`
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
                                    <span>{user.job_title}</span>
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
                                        <h1 className='fullname'>{`${user.firstname} ${user.lastname}`}</h1>
                                        <h2 className='personnal-title'>{user.job_title}</h2>
                                    </div>
                                    <div className='col-sm-3 hourly-rate'>
                                        <span className='rate'>{user.hourly_rate} €/h</span>
                                    </div>
                                </div>
                                <div className='full-description'>
                                    <div>{user.description}</div>
                                </div>
                            </div>
                            <div className='gird-infos-item full-skills'>
                                <h3>Top Skills</h3>
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
                            <div className='gird-infos-item full-experience'>
                                <h3>Experiences</h3>
                                <div className='experince-items'>
                                    {
                                        user.experience.map((item, index) => {
                                            return (
                                                <div className='item' key={index}>
                                                    <h4>{item.title}</h4>
                                                    <p><strong>{item.company}</strong>
                                                        <span className='date'>{item.date_bg} - {item.date_end}</span>
                                                    </p>
                                                    <div>{item.description}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='gird-infos-item full-education'>
                                <h3>Educations</h3>
                                <div className='education-items'>
                                    {
                                        user.education.map((item, index) => {
                                            return (
                                                <div className='item' key={index}>
                                                    <h4>{item.title}</h4>
                                                    <p><b>{item.degree}</b></p>
                                                    <p><strong>{item.school}</strong>
                                                        <span className='date'>{item.date_bg} - {item.date_end}</span>
                                                    </p>
                                                    <div>{item.description}</div>
                                                </div>
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

