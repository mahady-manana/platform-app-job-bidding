import React, {useState, useEffect, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Input, Textarea} from '../../../utils/formUtility'
import Experience from './experience';
import {SkillsOptions} from './skills_options';
import Education from './education';
import {FreelancerContext} from '../FreelancerContext';
import { completeUpdate, profilePhoto } from '../../api/api';
import Auth from '../../auth/auth.api';
import { read } from '../../auth/router.api';
import {TabExperience} from './tab-experience';
import {TabEducation} from './tab-education';
export const ContextForIndexSign = React.createContext(null)
const ProfileSettings = props => {
const context = useContext(FreelancerContext)
const [values, setValues] = useState({
    email : '',
    password : '',
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
    photo : '',
    previewPhoto : '',
    photoName : '',
    user_id : '',
    facebook : '',
    linkedin : '',
    twitter : '',
    github : '',
})
const [contextForIndex, setContextForIndex] = useState({
    data : {},
    index : ''
})
const [imageFile, setImageFile] = useState({photo : ''});
const [openPopupUpload, setOpenPhotoUpload] = useState(false)
const [isOpenAddExp, setIsOpenAddExp] = useState(false);
const [isOpenEduc, setOpenEduc] = useState(false);
const [popupMessage, setPopupMessage] = useState({
    error : false,
    success : false
})

useEffect(() => {
    let abortController = new AbortController();
    const jwtAuth = Auth.isAuthenticated();
    read(jwtAuth.user._id, jwtAuth.token, abortController.signal)
        .then(data => {
            setValues({
                ...values,
                email : data.email || '',
                user_id : data._id || '',
                photoName : data.photo || '',
                firstname : data.firstname || '',
                lastname : data.lastname || '',
                job_title : data.job_title || '',
                description : data.description || '',
                hourly_rate : data.hourly_rate || '',
                city : data.city || '',
                country : data.country || '',
                skill : data.skill || [],
                education : data.education || [],
                experience : data.experience || [],
                facebook : data.facebook || '',
                linkedin : data.linkedin || '',
                twitter : data.twitter || '',
                github : data.github || '',
            })
        })

    return () => abortController.abort();
}, [])

const handleBase64Image = event => {
    event.preventDefault();
    const reader = new FileReader();
    const renamedPhoto = new File([event.target.files[0]], 
        'photo-' + Date.now() + values.user_id + event.target.files[0].name.replace(/ /g, "-" ),
        {type : event.target.files[0].type})
        
    reader.readAsDataURL(renamedPhoto)
    reader.onload = e => {
        setValues({...values, photo : renamedPhoto, photoName : renamedPhoto.name, previewPhoto : reader.result})
    }
}
const handleChange = name => event => {
    event.preventDefault();
    const val = event.target.value;
    setValues({...values, [name] : val})
}
const handleExperience = (data, update, index) => {
    if (update && index !== '') {
            const updatedExp = values.experience;
            updatedExp[index].title = data.title;
            updatedExp[index].company =  data.company;
            updatedExp[index].date_bg = data.date_bg 
            updatedExp[index].date_end =  data.date_end
            updatedExp[index].description = data.description
            setValues(previousValues => ({
                ...previousValues, experience : updatedExp
            }))

    } else {
        setValues(previousValues => ({
            ...previousValues, experience : values.experience.concat(data)
        }))
    }
    setIsOpenAddExp(!isOpenAddExp)
}
const handleEducation = (data, update, index) => {
    if (update && index !== '') {
        const updatedEdu = values.education;
        updatedEdu[index].title = data.title;
        updatedEdu[index].school =  data.school;
        updatedEdu[index].degree = data.degree 
        updatedEdu[index].date_bg = data.date_bg 
        updatedEdu[index].date_end =  data.date_end
        updatedEdu[index].description = data.description

        setValues(previousValues => ({
            ...previousValues, education : updatedEdu
        }))  
    } else {
        setValues(previousValues => ({
            ...previousValues, education : values.education.concat(data)
        }))
    }
    setOpenEduc(!isOpenEduc)
}
const closeAddExp = event => {
    event.preventDefault();
    setContextForIndex(undefined);
    setIsOpenAddExp(!isOpenAddExp);
}
const closeAddEduc = event => {
    event.preventDefault();
    setContextForIndex(undefined);
    setOpenEduc(!isOpenEduc);
}
const updateEducation = indexID => event => {
    event.preventDefault();
    const edu = values.education[indexID]
    setContextForIndex({
        data : edu,
        index : indexID
    })
    setOpenEduc(!isOpenEduc)
}
const updateExperience = indexID => event => {
    event.preventDefault();
    const exp = values.experience[indexID]
    setContextForIndex({
        data : exp,
        index : indexID
    })
    setIsOpenAddExp(!isOpenAddExp);
}
const classOpenOrCloseExp = () => {
    if (isOpenAddExp) {
        return 'openx'
    } else {
        return 'closex'
    }
}
const classOpenOrCloseEduc = () => {
    if (isOpenEduc) {
        return 'openx'
    } else {
        return 'closex'
    }
}

const handleSubmitAll = event => {
    event.preventDefault();
    if (values.photo !== '') {
        const dateNow = Date.now();
        const formData =  new FormData();
            formData.append('file', values.photo)
            formData.append('uploaded', dateNow)
            profilePhoto(formData).then(res => { 
                        if (res.error) {
                            setOpenPhotoUpload(false)
                        }
                        setOpenPhotoUpload(false)
                    }
                )
    }
    const auth = Auth.isAuthenticated();
    const allFields = {
        firstname : values.firstname,
        lastname : values.lastname,
        job_title : values.job_title,
        description : values.description,
        hourly_rate : values.hourly_rate,
        city : values.city,
        photo : values.photoName,
        country : values.country,
        skill : values.skill,
        education : values.education,
        experience : values.experience,
        facebook : values.facebook,
        linkedin : values.linkedin,
        twitter : values.twitter,
        github : values.github,   
    }
    completeUpdate('freelancer', auth.user._id,auth.token,  allFields).then(res => {
        if (res.error) {
            setPopupMessage({...popupMessage, error : true})
            setTimeout(() => {
                setPopupMessage({...popupMessage, error : false})
            }, 15000);
        } else {
            setPopupMessage({...popupMessage, success : true})
            setTimeout(() => {
                setPopupMessage({...popupMessage, success : false})
            }, 15000);
        }
    })
}
const openPhotoUploader = event => {
    event.preventDefault()
    setOpenPhotoUpload(!openPopupUpload);
}
return (
<ContextForIndexSign.Provider value={{contextForIndex, setContextForIndex}}>
<div className='edit-profile'>
    <div className ='entry'>
        <section className='section'>
            <div className='inner-section mbgc-1'>
                <div className='container text-intro-setting white'>
                    <h3 className='text-center'>Make sure your profile is up-to-date</h3>
                    <p className='text-center'>YOUR PROFILE IS VERY VERY IMPORTANT - So make all best and accurate.</p>
                </div>
            </div>
        </section>
        <form onSubmit={handleSubmitAll} className='form_signup_full' encType='multipart/form-data'>
        <section className='section'>
            <div className='inner-section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 left_main_col'>
                            <div className='inner-col'>
                                <div className='profile'>
                                    <div className='profile_image'>
                                        <div className='image-container'>
                                            <img src={values.previewPhoto || '/uploads/profile/' + values.photoName} alt=''/>
                                        </div>
                                    </div>
                                    <div className='profile_upload'>
                                        <button className='btn' onClick={openPhotoUploader}>
                                            Choose profile
                                        </button>
                                    </div>
                                </div>
                                <div className='additionnals-infos'>
                                    <div className='email-infos-hidden'>
                                        <p className='text-center'><i aria-hidden className='fas fa-envelope-open-text'></i> {values.email}</p>
                                    </div>
                                    <div className='social-media'>                
                                        <Input name='firstname'
                                                        type='text'
                                                        fa='fab fa-linkedin-in'
                                                        placeholder='Linkedin'
                                                        value={values.linkedin}
                                                        onChange={handleChange('linkedin')}
                                                        />                
                                        <Input name='firstname'
                                                        type='text'
                                                        fa='fab fa-facebook-f'
                                                        placeholder='Facebook'
                                                        value={values.facebook}
                                                        onChange={handleChange('facebook')}
                                                        />                
                                        <Input name='firstname'
                                                        type='text'
                                                        fa='fab fa-twitter'
                                                        placeholder='Twitter'
                                                        value={values.twitter}
                                                        onChange={handleChange('twitter')}
                                                        />                
                                        <Input name='firstname'
                                                        type='text'
                                                        fa='fab fa-github'
                                                        placeholder='Github'
                                                        value={values.github}
                                                        onChange={handleChange('github')}
                                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8 right_col_main'>
                            <div className='personnal-infos'>
                                <div className='inner-col'>
                                    <div className='personnal-info'>
                                    <h3>Personnal informations :</h3>
                                    </div>
                                    <div className='row name-input'>
                                        <div className='col-sm-6'>                                        
                                            <Input name='firstname'
                                                    type='text'
                                                    fa='fa-user-edit'
                                                    placeholder='First name'
                                                    value={values.firstname}
                                                    onChange={handleChange('firstname')}
                                                    />
                                        </div>
                                        <div className='col-sm-6'>
                                            <Input name='lastname'
                                                        type='text'
                                                        fa='fa-user-edit'
                                                        placeholder='Last name'
                                                        value={values.lastname}
                                                        onChange={handleChange('lastname')}
                                                        />                                    
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <div className='job-title'>
                                            <Input name='job_title'
                                                type='text'
                                                fa ='fa-briefcase'
                                                placeholder='Your Title'
                                                value={values.job_title}
                                                onChange={handleChange('job_title')}
                                                />
                                        </div>
                                    </div>
                                    <div className='col-sm-4'>
                                        <div className='inner'>
                                            <Input name='hourly_rate'
                                                        type='number'
                                                        fa='fa-euro-sign'
                                                        placeholder='Hourly rate'
                                                        value={values.hourly_rate}
                                                        onChange={handleChange('hourly_rate')}
                                                        />                              
                                        </div>                                   
                                    </div>
                                </div>
                                <div className='description'>
                                    <Textarea name='description'
                                        rows='5'
                                        cols='20'
                                        placeholder='Describe yourself'
                                        value={values.description}
                                        onChange={handleChange('description')}
                                        />
                                </div>
                                <div className='adress-title'>
                                    <h4>Adress :</h4>
                                </div>
                                <div className='row adress'>
                                    <div className='col-sm-6'>
                                        <div className='city-addres'>
                                            <Input name='city'
                                                type='text'
                                                fa='fa-map-marker-alt'
                                                placeholder='Address, City'
                                                value={values.city}
                                                onChange={handleChange('city')}
                                                />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='inner'>
                                            <Input name='country'
                                                        type='country'
                                                        fa='fa-globe-europe'
                                                        placeholder='Country'
                                                        value={values.country}
                                                        onChange={handleChange('country')}
                                                        />                              
                                        </div>                                   
                                    </div>
                                </div>
                            </div>
                            {/* {Row for skills} */}

                            <div className='skills-section'>
                                <div className='skills'>
                                    <h3>Skills :</h3>
                                    <p>Choose your skills here</p>
                                </div>
                                <div className='skills-input'>
                                    <div className='listofskill'>{values.skill.map((item, i)=> {
                                        return (<span key={i} className='item_skill_list'>{item}</span>)
                                    })}</div>
                                    <p className='text-danger'>{values.skill.length <= 9 ? '' : 'MAX ALLOWED REACHED!'}</p>
                                    <Autocomplete
                                        options={values.skill.length <= 9 ? SkillsOptions : []}
                                        multiple={true}
                                        value={values.skill} 
                                        filterSelectedOptions={true}
                                        onChange={(e, newValue) => {
                                            e.preventDefault()
                                            setValues({...values, skill : newValue})}}
                                        getOptionLabel={options => options}
                                        renderInput={params => <TextField {...params} label='Skills' placeholder='Favorites skills'/>}
                                    />
                                </div>
                            </div>

                            {/* {Row for skills} */}
                            
                            {/* {Carrer prof } */}
                            <div className='add-experience'>
                                <h3>Professionnal Experience</h3>
                                    {
                                        values.experience.map((item, index) => {
                                            return (<TabExperience key={index} item={item} update={updateExperience(index)}/>)
                                        })
                                    }
                                <div className='addhere'>
                                    <button className='plusexperience' onClick={closeAddExp}>+
                                        <span className='add-span'>Add experience</span>
                                    </button>
                                </div>
                                <div className={`popup experience_add_popup ${classOpenOrCloseExp()}`}>
                                    <span className='closex_btn' onClick={closeAddExp}>x</span>
                                    <Experience save={handleExperience}/>
                                </div>
                            </div>
                            {/* {Carrer prof} */}
                            {/* {Education} */}
                            <div className='add-education'>
                                <h3>Education</h3>
                                <div className='education'>
                                    {
                                        values.education.map((item, index) => {
                                            return (
                                                <TabEducation key={index} item={item} update={updateEducation(index)}/>
                                            )
                                        })
                                    }
                                </div>
                                <div className='addhere'>
                                    <button className='pluseducation' onClick={closeAddEduc}>+
                                        <span className='add-span'>Add education</span>
                                    </button>
                                </div>
                                <div className={`popup education_add_popup ${classOpenOrCloseEduc()}`}>
                                    <span className='closex_btn' onClick={closeAddEduc}>x</span>
                                    <Education save={handleEducation}/>
                                </div>
                            </div>
                            {/* {education} */}
                            <div className='btn-container submit'>
                                <button className='btn save-change-submit mbgc-1 white' type='submit'>Save change</button>
                            </div>
                        </div>
                        {/* {column right} */}
                    </div>
                </div>
            </div>
        </section>
        </form>
        <form onSubmit={handleSubmitAll} className={`popup popup-form-photo ${openPopupUpload ? '' : 'closex'}`}>
            <span className='btn-closex' onClick={openPhotoUploader}>x</span>
            <div className='popup-content'>
                <div className='form-inner'>
                    <div className='profile_image'>
                        <div className='image-container'>
                            <img src={values.previewPhoto || '/uploads/profile/' + values.photo} alt=''/>
                        </div>
                    </div>
                    <div className='profile_upload'>
                        <label>{(values.previewPhoto === '' || values.photo === '') ? 'Choose photo' : 'Change photo'}
                            <input className='input-profile' type='file' accept="image/png, image/jpg,image/jpeg" onChange={handleBase64Image}/>
                        </label>
                    </div>
                        <div className='btn-container-save'>
                            <button type='submit' className='save-photo' disabled={
                                (values.previewPhoto === '' || values.photo === '') ? true : false
                            }>Save photo</button>
                        </div>
                </div>
            </div>
        </form>
    </div> 
</div>
<div className={`message-popup ${popupMessage.error ? 'message-error' : popupMessage.success ? 'message-success' : 'closex'}`}>
    <div className='content'>
        <i className={popupMessage.error ? 'fas fa-exclamation-circle' : 
                      popupMessage.success ? 'fa fa-check-circle' : ''} ></i>
        <p>{popupMessage.error ? 'Error - Unable to process this action' : 
            popupMessage.success ? 'Change saved successfully!' : ''}</p>
    </div>
</div>
</ContextForIndexSign.Provider>
)
}
export default ProfileSettings;