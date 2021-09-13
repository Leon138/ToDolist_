export const showErrorNotification = error => {
  const notification = document.createElement('div');
  const body = document.getElementsByTagName('body')[0];
  notification.innerText = error.response.data.error.message;
  notification.className = 'error-notification';
  body.append(notification);
  setTimeout( () => notification.style.display = 'none', 3000);
}

export const signUpErrorEmail = error => {
  const errorMesagges = document.querySelector('.error-mesagges');
  errorMesagges.innerText = error.message;
  errorMesagges.className = 'error-mesagges';
  setTimeout( () => errorMesagges.style.display = 'flex', 10);
  setTimeout( () => errorMesagges.style.display = 'none', 4000);
}