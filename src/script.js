import { routes, paths } from './shared/constants/routes';
import { signInHandler } from './components/sign-in/sign-in';
import { signUpHandler } from './components/sign-up/sign-up';
import { logoutBtn } from './components/profile/profile';
import { createLists, renderBlockList, setUserInfo } from './components/home-page/home-page';
import { recovery } from './components/recovery/recovery';
import { ToDoList, renderTask } from './components/todo-list/todolist';
import { getToken } from './shared/ls-services';

import './styles/styles.scss';

window.onload = () => {
  const pathname = Object.values(paths).find( path => path === window.location.pathname );

  switch(pathname) {
    case paths.home:
      const token = getToken();
      if (token) {
        window.location.href = routes.home_page;
      } 

      break;
    case paths.sign_in:
      signInHandler();
      break;
    case paths.sign_up:
      signUpHandler();
      break;
    case paths.home_page:
      renderBlockList();
      createLists();
      setUserInfo();
      logoutBtn();
      break;  
    case paths.todolist:
      ToDoList();
      renderTask();
      setUserInfo();
      logoutBtn();
      break;
    case paths.recovery:
      recovery();
      break;
      default:
      break;
  }
}
