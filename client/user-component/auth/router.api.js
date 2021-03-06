import axios from 'axios';

const signin = async (type, user) => {
  let API_URL;
  if (type === 'freelanceer') {
    API_URL = '/user/worker/auth/v3/signin';
  } else if (type === 'client') {
    API_URL = '/user/ccompany/auth/v2/signin';
  } else {
    return undefined;
  }
    try {
      let response = await fetch(API_URL, {
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
      return error.json();
    }
}
// const read = async (id, credentials, signal) => {
//     try {
//       let response = await fetch('/user/worker/auth/' + id, {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + credentials.t
//         }
//     })
//       return await response.json()
//     } catch(err) {
//       console.log(err)
//       console.trace()
//     }
//   }  
const read = async (params, credentials, signal) => {
  // let API_URL;
  // if (type === 'freelanceer') {
  //   API_URL = '/user/worker/auth/v3/signin';
  // } else if (type === 'client') {
  //   API_URL = '/user/ccompany/auth/v2/signin';
  // } else {
  //   return undefined;
  // }
  try {
    let response = await fetch('/user/worker/auth/' + params, {
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
  const signout = async (type) => {
    let API_URL;
    if (type === 'freelanceer') {
      API_URL = "/user/worker/auth/v3/signout";
    } else if (type === 'client') {
      API_URL = '/user/ccompany/auth/v2/signout';
    } else {
      return undefined;
    }
    try {
      let response = await fetch(API_URL)
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
  