import { signIn } from '../../api/api-handlers';
import { passwordValidator, emailValidator } from '../../shared/validators';

export const signInHandler = () => {
  const signInForm = document.querySelector('.Sign-in-form');
  const signInBtn = document.querySelector('.btnSign_in');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const formValid = {
    email: {
      isValid: false
    },
    password: {
      isValid: false
    }
  }

  signInBtn.setAttribute('disabled', true);

  signInForm.addEventListener('submit', event => {
    event.preventDefault();

    signIn(emailInput.value, passwordInput.value);

  });

  passwordInput.oninput = () => {
    passwordValidator(passwordInput.value) ? formValid.password.isValid = true : formValid.password.isValid = false;
    checkFormValid();
  }

  emailInput.oninput = () => {
    emailValidator(emailInput.value) ? formValid.email.isValid = true : formValid.email.isValid = false;
    checkFormValid();
  }
  
  const checkFormValid = () => {
    const isFormValid = Object.values(formValid).every(value => value.isValid);
    isFormValid ? signInBtn.removeAttribute('disabled') : signInBtn.setAttribute('disabled', true);
  }

}
