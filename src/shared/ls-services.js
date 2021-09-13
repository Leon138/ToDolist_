export const getToken = () => localStorage.getItem('token');

export const setToken = token => localStorage.setItem('token', token);

export const removeToken = () => localStorage.removeItem('token');

export const getUserEmail = () => localStorage.getItem('userEmail');

export const setUserEmail = email => localStorage.setItem('userEmail', email);

export const removeUserEmail = email => localStorage.removeItem('userEmail');

export const setPersonalData = user => localStorage.setItem('personalData', JSON.stringify(user));

export const getPersonalData = () => JSON.parse(localStorage.getItem('personalData'));

export const setUID = id => localStorage.setItem('uid', id);

export const getUID = () => localStorage.getItem('uid');

export const setUserId = id => localStorage.setItem('userId', id);

export const getUserId = () => localStorage.getItem('userId');

export const setBlockId = id => localStorage.setItem('blockId', id);

export const getBlockId = () => localStorage.getItem('blockId');
