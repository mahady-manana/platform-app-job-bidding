import axios from 'axios';

const create = async (data) => {
    try {
        const user = axios.post('/user/type-freelancer/tp3/add', data);
        return (await user).data;
    } catch (error) {
        console.log(error);
0    }
}

const completeUpdate = async (params, credentials, data) => {
       
    try {
        const user = axios.put('/user/type-freelancer/tp3/full/' + params, data ,{
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
const addPhoto = async (params, credentials, data) => {
       
    try {
        const user = axios.put('/user/type-freelancer/tp3/photo/' + params, data ,{
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
const read = async (params, credentials, signal) => {
    try {
      let response = await fetch('/user/worker/type-freelancer/tp3/auth/' + params, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials
        },
        signal : signal
    })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}
export {
    create,
    addPhoto,
    completeUpdate,
    sendEmail,
    profilePhoto,
    read
}