import { removeToken, removeUserEmail } from '../../shared/ls-services';
import { routes } from '../../shared/constants/routes';
import { getToken } from '../../shared/ls-services';

export const logoutBtn = () => {
  const token = getToken();
  const logoutBtn = document.getElementById('logoutBtn');
  
  logoutBtn.onclick = () => {
    removeToken();
    removeUserEmail();
    window.location.href = routes.home;
  };

}
