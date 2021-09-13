import { signUp } from '../../api/api-handlers';
import { passwordValidator, emailValidator } from '../../shared/validators';

export const signUpHandler = () => {
  const signUpForm = document.querySelector('.Sign-up-form');
  const password_1 = document.getElementById('password_1');
  const password_2 = document.getElementById('password_2');
  const signUpBtn = document.querySelector('.btnSign_up');
  const emailInput = document.getElementById('email');
  const emailError = document.querySelector('.Sign-up-form-email-error');
  const passwordError = document.querySelector('.Sign-up-form-password-error');
  const repeatPassword = document.querySelector('.Sign-up-form-repeat-password-error');
  
  signUpForm.addEventListener('submit', event => {
    event.preventDefault();

    const user = {
      email: emailInput.value,
      password: password_1.value
    }

    signUp(user);
  });

  const formValid = {
    email: {
      isValid: false
    },
    password1: {
      isValid: false
    },
    password2: {
      isValid: false
    }
  }

  signUpBtn.setAttribute('disabled', true);

  emailInput.oninput = () => {
    if (emailValidator(emailInput.value) || emailInput.value == '') {
      formValid.email.isValid = true;
      emailError.style.display = 'none';
    } else formValid.email.isValid = false;

    checkFormValid();
  }

  emailInput.onblur = () => {
    !emailValidator(emailInput.value) ? emailError.style.display = 'flex' : emailError.style.display = 'none';
  }

  password_1.oninput = () => {
    if (passwordValidator(password_1.value) || emailInput.value == '') {
      formValid.password1.isValid = true;
      passwordError.style.display = 'none';
    } else formValid.password1.isValid = false;

    checkFormValid();
  }

  password_1.onblur = () => {
    !passwordValidator(password_1.value) ? passwordError.style.display = 'flex' : passwordError.style.display = 'none';
  }

  password_2.oninput = () => {
    if (formValid.password1.isValid  && (password_1.value === password_2.value)) {
      formValid.password2.isValid = true;
      repeatPassword.style.display = 'none';
      signUpBtn.removeAttribute('disabled');
    } else signUpBtn.setAttribute('disabled', true);
    checkFormValid();
  }

  password_2.onblur = () => {
    password_1.value !== password_2.value ? repeatPassword.style.display = 'flex' : repeatPassword.style.display = 'none';
  }

  const checkFormValid = () => {
    const isFormValid = Object.values(formValid).every(value => value.isValid);
    isFormValid ? signUpBtn.removeAttribute('disabled') : signUpBtn.setAttribute('disabled', true);
  }
  
}
