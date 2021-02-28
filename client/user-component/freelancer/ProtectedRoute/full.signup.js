import React, {useState, useEffect, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Input, Textarea} from '../../../utils/formUtility'
import Experience from '../experience';
import SkillsOptions from '../skills_options';
import Education from '../education';
import {FreelancerContext} from '../FreelancerContext';
import { completeUpdate } from '../../api/api';
import Auth from '../../auth/auth.api';
import { read } from '../../auth/router.api';

const FillSignup = props => {
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
    photo_sign : ''
})
const [imageFile, setImageFile] = useState({photo : ''});

const [isOpenAddExp, setIsOpenAddExp] = useState(false);
const [isOpenEduc, setOpenEduc] = useState(false);

useEffect(() => {
    let abortController = new AbortController();
    const jwtAuth = Auth.isAuthenticated();
    read(jwtAuth.user._id, jwtAuth.token, abortController.signal)
        .then(data => {
            setValues({
                ...values,
                firstname : data.firstname,
                lastname : data.lastname,
                job_title : data.job_title,
                description : data.description,
                hourly_rate : data.hourly_rate,
                city : data.city,
                country : data.country,
                skill : data.skill,
                education : data.education,
                experience : data.experience,
            })
            console.log(data)
        })

    return () => {
        abortController.abort();
    }
}, [])

const handleBase64Image = event => {
    event.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload = e => {
        setImageFile({photo : reader.result})
    }
    setValues({...values, photo : event.target.files[0]})
}
const handleChange = name => event => {
    event.preventDefault();
    const val = event.target.value;
    setValues({...values, [name] : val})
}
const handleExperience = data => {
    setValues(previousValues => ({
        ...previousValues, experience : values.experience.concat(data)
    }))
    setIsOpenAddExp(!isOpenAddExp)
}
const handleEducation = data => {
    setValues(previousValues => ({
        ...previousValues, education : values.education.concat(data)
    }))
    setOpenEduc(!isOpenEduc)
}
const closeAddExp = event => {
    event.preventDefault();
    setIsOpenAddExp(!isOpenAddExp)
}
const closeAddEduc = event => {
    event.preventDefault();
    setOpenEduc(!isOpenEduc);
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
    const dateNow = Date.now();
    const formData =  new FormData();
          formData.append('file', values.photo)
          formData.append('filename', values.photo.name)
          formData.append('uploaded', dateNow)
          formData.append('photo_sign', dateNow + values.email + values.name)
    const allFields = {
        firstname : values.firstname,
        lastname : values.lastname,
        job_title : values.job_title,
        description : values.description,
        hourly_rate : values.hourly_rate,
        city : values.city,
        country : values.country,
        skill : values.skill,
        education : values.education,
        experience : values.experience,
    }
    const auth = Auth.isAuthenticated();
    // axios.post('/photo-profile/medias/upload', formData, {
    //     'contentType' : 'multipart/form-data'
    // }).then(res => console.log('Added Photo')).catch(err => console.log(err))
    completeUpdate('freelancer', auth.user._id,auth.token,  allFields).then(res => {
        console.log(res)
    })
}
return (
<>
<div className='edit-profile'>
    <div className ='entry'>
        <section className='section'>
            <div className='inner-section'>
                <div className='contaier'>
                    <h3 className='text-center'>All settings of yours : Make sure to save your change</h3>
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
                                <div className='profile_image'>
                                    <div className='image-container'>
                                        <img src={imageFile.photo} alt=''/>
                                    </div>
                                </div>
                                <div className='profile_upload'>
                                    <label>{imageFile.photo === '' ? 'Choose profile' : 'Change profile'}
                                        <input className='input-profile' type='file' onChange={handleBase64Image}/>
                                    </label>
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
                                <div className='experience_posted'>
                                    {
                                        values.experience.map((item, index) => {
                                            return (
                                                <div key={index} className='experience_tab'>
                                                    <h4 className='title'>{item.title}</h4>
                                                    <p><span className='company'>{item.company}</span> - From : <span className='date_experience'>{item.date_bg}</span> to <span className='date_experience'> {item.date_end}</span></p>
                                                    <div className='description_experience'>{item.description}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
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
                                                <div key={index} className='education_tab'>
                                                    <h4 className='title'>{item.title}</h4>
                                                    <p><span className='school'>{item.school}</span> - From : <span className='date_educ'>{item.date_bg}</span> to <span className='date_educ'> {item.date_end}</span></p>
                                                    <div className='degree_educ'>Degree : {item.degree}</div>
                                                    <div className='description'>{item.description}</div>
                                                </div>
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
    </div> 
</div>
</>
)
}
export default FillSignup;