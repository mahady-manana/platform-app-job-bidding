import axios from 'axios';

const signin = async (user) => {
    try {
      let response = await fetch('/user/worker/auth/signin/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}
const read = async (params, credentials, signal) => {
    try {
      let response = await fetch('/user/worker/auth/' + params.userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
    })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }  
  const signout = async () => {
    try {
      let response = await axios.get('/user/worker/auth/signout')
        return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  export {
    signin,
    signout,
    read
  }
  