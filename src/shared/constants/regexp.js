export const REGEXP = {
  PASSWORD_LENGTH: /^\d{6}$/,
  EMAIL: /^[a-z0-9.\-_+]+@[a-z0-9\-_+]+\.[a-z0-9.\-_+]{2,6}$/i,
  EMAILREPEATSUMBOLS: /([.*!\-_#%$&/=?^{|}+])\1{1,}/
}
