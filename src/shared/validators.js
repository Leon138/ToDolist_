import { REGEXP } from './constants/regexp';

export const passwordValidator = password => password.match(REGEXP.PASSWORD_LENGTH);

export const emailValidator = email => email.match(REGEXP.EMAIL) && !email.match(REGEXP.EMAILREPEATSUMBOLS);
