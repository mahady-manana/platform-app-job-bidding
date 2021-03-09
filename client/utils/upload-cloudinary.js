import React, {useState} from 'react';

export const UploadCloudinary = props => {
const [file, setFile] = useState({
    preview : '',
    photo : ''
})
const handleChange = event => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file)
    reader.onload = e => {
        setFile({...file, preview : reader.result, photo : file})
    }
    console.log(file)
}
const handleUpload = event => {
    event.preventDefault();
    props.save(file.photo)
}
return (
<div className='uploader-widget'>
    <div className='form-container'>
        <form onSubmit={handleUpload} className='upload-file'>
            <label className='label-file'>
                {
                    file.preview === '' ? '' : <img src={file.preview} alt='preview' width='250' height='250'/>
                }
                Choose your photo
                <input type='file' onChange={handleChange} accept="image/png, image/jpg,image/jpeg"/>
            </label>
            <div>
            <button type='submit' className='btn submit' disabled={
                file.preview === '' ? true : false
            }>Save as profile</button>
            </div>
        </form>
    </div>
</div>
)
}