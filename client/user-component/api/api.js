import axios from 'axios';

const create = async (type, data) => {
    let API_URL;
    if (type === 'freelancer') {
        API_URL = '/user/type-freelancer/tp3/add';
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
export {
    create,
    completeUpdate
}