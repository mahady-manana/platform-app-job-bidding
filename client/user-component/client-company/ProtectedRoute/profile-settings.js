import React, {useState, useEffect, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Input, Textarea} from '../../../utils/formUtility';
import {UploadCloudinary} from '../../../utils/upload-cloudinary';
import {SkillsOptions} from '../../skills_options';
import { completeUpdate, addPhoto ,read} from '../../api/api-client';
import { Cloudinary} from '../../api/cloudinary.api';
import Auth from '../../auth/auth.api';
export const ContextForIndexSign = React.createContext(null)
const ProfileSettings = () => {
const [values, setValues] = useState({
    email : '',
    password : '',
    firstname : '',
    lastname : '',
    company : '',
    company_address : '',
    description : '',
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
const [loading, setLoading] = useState(false);
const [contextForIndex, setContextForIndex] = useState({
    data : {},
    index : ''
})
const [openPopupUpload, setOpenPhotoUpload] = useState(false)
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
                photo : data.photo || '',
                firstname : data.firstname || '',
                company : data.company || '',
                lastname : data.lastname || '',
                company_address : data.company_address || '',
                description : data.description || '',
                city : data.city || '',
                country : data.country || '',
                skill : data.skill || [],
                facebook : data.facebook || '',
                linkedin : data.linkedin || '',
                twitter : data.twitter || '',
                github : data.github || '',
            })
        })

    return () => {
        abortController.abort();
    }
}, [])

const handleChange = name => event => {
    event.preventDefault();
    const val = event.target.value;
    setValues({...values, [name] : val})
}
const SaveProfile = (file) => {
    const auth = Auth.isAuthenticated();
    setLoading(true)
    // Cloudinary API
    Cloudinary(file).then( data => { 
        setValues({...values, photo : data.secure_url})
        // Update Photo in DB
        addPhoto(auth.user._id,auth.token,  {photo : data.secure_url}).then(res => {
            if (res && res.error) {
                setLoading(false)
                setOpenPhotoUpload(!openPopupUpload)
                setPopupMessage({...popupMessage, error : true})
                setTimeout(() => {
                    setPopupMessage({...popupMessage, error : false})
                }, 5000);
            } else {
                setLoading(false)
                setOpenPhotoUpload(!openPopupUpload)
                setPopupMessage({...popupMessage, success : true})
                setTimeout(() => {
                    setPopupMessage({...popupMessage, success : false})
                }, 5000);
            }
        })  
    })
}

const handleSubmitAll = event => {
    event.preventDefault();
    setLoading(true)
    const auth = Auth.isAuthenticated();
    const allFields = {
        firstname : values.firstname,
        lastname : values.lastname,
        company : values.company,
        company_address : values.company_address,
        description : values.description,
        city : values.city,
        country : values.country,
        skill : values.skill,
        facebook : values.facebook,
        linkedin : values.linkedin,
        twitter : values.twitter,
        github : values.github,   
    }
    completeUpdate(auth.user._id,auth.token,  allFields).then(res => {
        if (res.error) {
            setLoading(false)
            setPopupMessage({...popupMessage, error : true})
            setTimeout(() => {
                setPopupMessage({...popupMessage, error : false})
            }, 15000);
        } else {
            setLoading(false)
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
<div className='edit-profile client-settings'>
    <div className ='entry'>
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
                                            <img src={values.photo} alt=''/>
                                        </div>
                                    </div>
                                    <div className='profile_upload'>
                                        <button className='btn' onClick={openPhotoUploader}>
                                            Company logo or profile
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
                                    <h3>Company or Personnal informations :</h3>
                                    </div>
                                    <div className='comapny-input'>
                                        <div className='company'>                                        
                                                <Input name='company'
                                                        type='text'
                                                        fa='far fa-building'
                                                        placeholder='Company name'
                                                        value={values.company}
                                                        onChange={handleChange('company')}
                                                        />
                                                <Input name='company_address'
                                                        type='text'
                                                        fa='fa-map-marker-alt'
                                                        placeholder='Company Address'
                                                        value={values.company_address}
                                                        onChange={handleChange('company_address')}
                                                        />
                                            </div>
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
                                <div className='description'>
                                    <Textarea name='description'
                                        rows='5'
                                        cols='20'
                                        placeholder='Describe your Company, Domain, Activities, etc'
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
                                    <h3>Researched Skills :</h3>
                                    <p>Choose what skills you are looking for</p>
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
        <div className={`popup popup-upload-widget ${openPopupUpload ? '' : 'closex'}`}>
            <span className='btn-closex' onClick={openPhotoUploader}>x</span>
            <div className='popup-content'>
                <UploadCloudinary save={SaveProfile}/>
            </div>
        </div>
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

<div className={`loading-popup ${loading ? '' : 'closex'}`}>
        <span className='loading-icon'>Please wait...</span>
</div>
</ContextForIndexSign.Provider>
)
}
export default ProfileSettings;