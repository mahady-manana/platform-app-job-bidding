import axios from 'axios';

const create = async (data) => {
    try {
        const user = axios.post('/user/type-freelancer/tp3/add', data);
        return (await user).data;
    } catch (error) {
        console.log(error);
    }
}

const completeUpdate = async (params, data) => {
    try {
        const user = axios.put('/user/type-freelancer/tp3/full/' + params, data)
        return (await user).data
    } catch (error) {
        console.log(error)
    }
}
export {
    create,
    completeUpdate
}