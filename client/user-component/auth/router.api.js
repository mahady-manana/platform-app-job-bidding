import axios from 'axios';

const signin = async (user) => {
    try {
      let response = await fetch('/user/all/auth/v1/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(error) {
      console.log(error);
    }
}
const CheckerSignup = async (user) => {
    try {
      let response = await axios.post('/user/all/checker/v1/signup', user)
      return (await response).data
    } catch(err) {
      console.log(err)
    }
  }  
const signout = async () => {

    try {
      let response = await fetch('/user/all/auth/v1/signout')
        return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  export {
    CheckerSignup,
    signin,
    signout,
}
  