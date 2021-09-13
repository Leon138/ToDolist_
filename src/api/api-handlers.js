require('firebase/auth');
import firebase from 'firebase/app';
import { firebaseConfig, DataBaseURL, authUrl } from './api-config';
import { showErrorNotification, signUpErrorEmail } from '../shared/error-handlers';
import { routes } from '../shared/constants/routes';
import { getUID, setPersonalData, setToken, setUID } from '../shared/ls-services';
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json'
};

export const initApi = () => {
  firebase.initializeApp(firebaseConfig);
}

initApi();

export const signIn = (email, password) => {
  return axios.post(authUrl, {
    email,
    password,
    returnSecureToken: true
  })
    .then(response => {
      if (response) {
        const { idToken: token, localId } = response.data;
        setToken(token);
        setUID(localId);
        getUser().then( () => window.location.href = routes.home_page);
      }
    }) 
    .catch(err => {
      showErrorNotification(err);
    }); 
}

export const createAuthData = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( response => {
      const { uid } = response.user;
      setUID(uid);
    });
}

export const createUser = user => {
  const { email } = user;
  return fetch(`${DataBaseURL}/users.json`,
  {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      uuid: getUID()
    })
  });
}

export const signUp = async user => {
  const { email, password } = user;

  try {
    await createAuthData(email, password);
    await createUser(user);
    await signIn(email, password);
  } catch (error) {
    signUpErrorEmail(error);
  }
}

export const passwordRecovery = email => {
  firebase.auth().sendPasswordResetEmail(email)
    .then( setTimeout( () => window.location.href = routes.sign_in, 5000))
    .catch ( error => showErrorNotification(error));
}

export const createTask = task => {
  const { name, date, Time, input_value, blockId, userId, completed } = task;
  return fetch (`${DataBaseURL}/task.json`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        userId,
        name,
        date,
        Time,
        input_value,
        completed,
        blockId,
      })
    }
  )
  .then( response => response.json())  
};

export const getTask = () => {
  return fetch(`${DataBaseURL}/task.json`,
    { 
      method: 'GET',
      headers
    }
  )
  .then( response => response.json())
  .then( result => {
    if(result) {
      const transformedTaskArr = Object.keys(result).map( key => ({
        ...result[key],
        id: key
      }));
      return transformedTaskArr;
    };
  });
};

export const deleteTask = async ({ id }) => {
  return fetch(
    `${DataBaseURL}/task/${id}.json`,
    {
      method: 'DELETE',
      headers,
    }
  )
  .then(response => response.json())
};

export const updateTask = task => {
  const { id, name, date, Time, input_value, blockId, userId, completed } = task;
  return fetch(
    `${DataBaseURL}/task/${id}.json`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify ({
        id, 
        name, 
        date, 
        Time, 
        input_value, 
        blockId, 
        userId, 
        completed
      })
    }
  )
  .then(response => response.json())
}

export const getUser = () => {
  return axios.get(`${DataBaseURL}/users.json`)
  .then( response => {
    if(response) {
      const transformedUsers = Object.keys(response.data).map( key => ({
      ...response.data[key], id: key}));
    const user = transformedUsers.find( user => user.uuid === getUID());
    setPersonalData(user);
    }
  })
};

export const getUserById = id => axios.get(`${DataBaseURL}/users/${id}.json`);

export const getUsers = () => {
  return axios.get(`${DataBaseURL}/users.json`)
    .then( response => {
      if (response) {
        return Object.keys(response.data).map( key => ({...response.data[key], id: key}));
      }
    });
};

export const createBlock = block => {
  const { name, date, Time, userId, blockId } = block;
  return fetch (`${DataBaseURL}/block.json`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        userId,
        name,
        date,
        Time,
        blockId
      })
    },
  )
};

export const getBlock = () => {
  return fetch(`${DataBaseURL}/block.json`,
    { 
      method: 'GET',
      headers
    }
  )
  .then( response => response.json())
  .then( result => {
    if(result) {
      const transformedBlock = Object.keys(result).map( key => ({
        ...result[key],
        id: key
      }));
      return transformedBlock;
    };
  });
};

export const deleteBlock = async ({ id }) => {
  return fetch(
    `${DataBaseURL}/block/${id}.json`,
    {
      method: 'DELETE',
      headers,
    }
  )
  .then(response => response.json())
};
