import axios from 'axios';

const create = async (type, data) => {
    let API_URL;
    if (type === 'freelancer') {
        API_URL = '/user/type-freelancer/tp3/add';
    } else if (type === 'client') {
        API_URL = '/user/type-ccompany/tp2/add';
    } else {
        return undefined
    }
    try {
        const user = axios.post(API_URL, data);
        return (await user).data;
    } catch (error) {
        console.log(error);
    }
}

const completeUpdate = async (type ,params, credentials, data) => {
    let API_URL;
    if (type === 'freelancer') {
        API_URL = '/user/type-freelancer/tp3/full/';
    } else if (type === 'client') {
        API_URL = '/user/type-freelancer/tp3/full/';
    } else {
        
    }
    try {
        const user = axios.put(API_URL + params, data ,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
              }
            })
        return (await user).data
    } catch (error) {
        console.log(error)
    }
}
const sendEmail = async (data) => {
    try {
        const postemail = axios.post('/user/post/email/verify/', data)
        return (await postemail).data
    } catch (error) {
        return error
    }
}
const profilePhoto = async (data) => {
    try {
        const post = axios.post('/photo-profile/medias/upload', data, {
            'contentType' : 'multipart/form-data'
        })
        return (await post).data
    } catch (error) {
        console.log(error)
    }
}
export {
    create,
    completeUpdate,
    sendEmail,
    profilePhoto
}