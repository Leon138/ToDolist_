import { emailValidator } from '../../shared/validators';
import { passwordRecovery } from '../../api/api-handlers';

export const recovery = () => {
  const recoveryInput = document.querySelector('.recovery-form-input');
  const btnRecovery = document.querySelector('.btn-recovery');
  const emailErrorRecovery = document.querySelector('.recovery-form-email-error');
  const checkEmail = document.querySelector('.recovery-form-check-email');

  btnRecovery.setAttribute('disabled', true);

  recoveryInput.oninput = () => {
    if (emailValidator(recoveryInput.value)) {
      emailErrorRecovery.style.display = 'none';
      btnRecovery.removeAttribute('disabled');
    } else btnRecovery.setAttribute('disabled', true);

  }

  recoveryInput.onblur = () => {
    !emailValidator(recoveryInput.value) ? emailErrorRecovery.style.display = 'flex' : emailErrorRecovery.style.display = 'none';
  }

  btnRecovery.onclick = () => {
    passwordRecovery(recoveryInput.value);
    checkEmail.style.display = 'flex';
    setTimeout( () => checkEmail.style.display = 'none', 7000);
  }

}
