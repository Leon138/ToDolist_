import { routes } from '../../shared/constants/routes';
import { getTask, deleteTask, getUsers, createBlock, getBlock, deleteBlock } from '../../api/api-handlers';
import { getPersonalData, getUID, setBlockId } from '../../shared/ls-services';
import moment from 'moment';

export const createLists = () => {
  const dropDown = document.querySelector('.user-info');
  const user = document.querySelector('.user');
  const blockInputName = document.querySelector('.wrapper-content-block-add-name-input');
  const btnCreate = document.querySelector('.wrapper-content-block-add-name-btn-create');

  user.addEventListener('click', event => {
    event.preventDefault();
    dropDown.classList.toggle('user-info-open');
  });

  const block = {
    name: null,
    date: null,
    Time: null,
    completed: false,
    userId: getPersonalData().id,
  }

  btnCreate.addEventListener('click', () => {
    block.name = blockInputName.value;
    block.date = moment().format();
    block.Time = moment().format('LTS');
    createBlock(block)
      .then( () => renderBlockList());
    blockInputName.value = null;
  });

}

export const renderBlockList = async () => {
  const content = document.querySelector('.wrapper-content');
  const addBlock = document.querySelector('.wrapper-content-block-add');
  const warningBlock = document.querySelector('.warning');
  const btnNo = document.querySelector('.warning-button-no');
  const btnYes = document.querySelector('.warning-button-yes');
  const div_more_horiz = document.createElement('div');
  const more_horiz = document.createElement('img');
  const wrapperContent = document.createElement('div');
  let blocks;
  let tasks;
  let users

  await getTask().then( response => tasks = response);
  await getUsers().then(response => users = response);
  await getBlock().then(response => blocks = response); 
  
  wrapperContent.innerHTML = null;

  blocks.forEach( block => { 
    const user = users.find(user => user.id === block.userId);
    if (user.uuid === getUID()) {
      const divContent = document.createElement('div');
      const divNameList = document.createElement('div');
      const textareaNameList = document.createElement('textarea');
      const imgEdit = document.createElement('img');
      const imgDelete = document.createElement('img');
      const imgStar = document.createElement('img');
      const imgStarBackground = document.createElement('img');
      const taskList = document.createElement('div');
      const ul = document.createElement('ul');
      const li_1 = document.createElement('li');
      const li_2 = document.createElement('li');
      const li_3 = document.createElement('li');
      const li_4 = document.createElement('li');
      const textarea_1 = document.createElement('textarea');
      const textarea_2 = document.createElement('textarea');
      const textarea_3 = document.createElement('textarea');
      const textarea_4 = document.createElement('textarea');
      const a = document.createElement('a');

      content.innerHTML = null;

      imgStar.src = '/image/star.png';
      imgStarBackground.src = '/image/star_black_24dp.png';
      imgEdit.src = '/image/edit.png';
      imgDelete.src = '/image/delete.png'; 
      a.href = './todolist.html';
      imgDelete.title = 'delete';
      imgEdit.title = 'full-screen';
      imgStar.title = 'important';
      more_horiz.src = '/image/more_horiz.png';
      more_horiz.style.display = 'none';

      divContent.className = 'wrapper-content-block';
      wrapperContent.className = 'wrapper-content-wrapper';
      textarea_1.className = 'textarea';
      textarea_2.className = 'textarea';
      textarea_3.className = 'textarea';
      textarea_4.className = 'textarea';
      divNameList.className = 'name-list';
      textareaNameList.className = 'name-list-input';
      imgEdit.className = 'img-edit';
      imgStar.className = 'img-star';
      imgStarBackground.className = 'img-star-background';
      imgDelete.id = 'img-delete';
      taskList.className = 'wrapper-content-block-task-list';
      div_more_horiz.className = 'wrapper-content-block-footer';
      more_horiz.className = 'wrapper-content-block-footer-img';

      textareaNameList.innerHTML = block.name;

      if (tasks) {
        tasks.forEach( task => {
          if (block.id == task.blockId) {
            textarea_1.innerHTML = task.input_value;
            textarea_2.innerHTML = task.input_value;
            textarea_3.innerHTML = task.input_value;
            textarea_4.innerHTML = task.input_value;
          } 
        });  
      }
      
      content.append(wrapperContent);
      wrapperContent.append(divContent);
      divContent.appendChild(divNameList);
      divNameList.appendChild(a);
      a.appendChild(imgEdit);
      divNameList.append(imgStar, imgStarBackground, textareaNameList, imgDelete);
      divContent.append(taskList, div_more_horiz);
      div_more_horiz.append(more_horiz);
      taskList.append(ul);
      ul.append(li_1, li_2, li_3, li_4);
      li_1.append(textarea_1);
      li_2.append(textarea_2);
      li_3.append(textarea_3);
      li_4.append(textarea_4);
      wrapperContent.append(addBlock);

      imgEdit.addEventListener('click', () => {
        setBlockId(block.id);
        window.location.href = routes.todolist;
      });

      imgStar.addEventListener('click', () => {
        wrapperContent.prepend(divContent);
        if(imgStar) {
          imgStarBackground.style.display = 'block';
          imgStar.style.display = 'none';
        }
      });

      imgStarBackground.addEventListener('click', () => {
        wrapperContent.append(divContent);
        wrapperContent.appendChild(addBlock);
        if (imgStarBackground) {
          imgStarBackground.style.display = 'none';
          imgStar.style.display = 'block';
        }
      });    

      imgDelete.addEventListener('click', () => {
        divContent.append(warningBlock);
        warningBlock.style.display = 'flex';  
        btnYes.onclick = () => {
          if (btnYes) {
            divContent.remove();
            deleteBlock(block);
            if (tasks) {
              tasks.forEach( task => {
                if (block.id == task.blockId){
                  deleteTask(task);
                }
              })
            }
          }
          warningBlock.style.display = 'none';  
        }
        btnNo.onclick = () => {
          if (btnNo) {
            warningBlock.style.display = 'none';  
          }
        }
      });
    }  
  });
}

export const setUserInfo = () => {
  const pUserName = document.querySelector('.header-user-name');
  const userName = `${getPersonalData().email}`;
  pUserName.innerText = userName; 
}
