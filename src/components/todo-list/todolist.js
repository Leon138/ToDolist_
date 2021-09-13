import moment from 'moment';
import { createTask, getTask, updateTask, deleteTask, getUsers, getBlock } from '../../api/api-handlers';
import { getPersonalData, getUID, getBlockId } from '../../shared/ls-services';

export const ToDoList = async() => {
  const dropDown = document.querySelector('.user-info');
  const user = document.querySelector('.user');
  const imgBurger = document.querySelector('.todolist-header-img-burger-menu');
  const divSort = document.querySelector('.todolist-header-img-burger-menu-sort');
  const blockAdd = document.querySelector('.todolist-add');
  const blockAddImg = document.querySelector('.todolist-add-img');
  const todolist = document.querySelector('.todolist');
  const imgStar = document.querySelector('.todolist-header-img-star');
  const imgStarBackground = document.querySelector('.todolist-header-img-star-black');
  const headerName = document.querySelector('.todolist-header-block-name');
  const footer = document.querySelector('.footer');
  const radio1 = document.querySelector('.footer-form-span-1');
  const radio2 = document.querySelector('.footer-form-span-2');
  const radio3 = document.querySelector('.footer-form-span-3');
  const radio4 = document.querySelector('.footer-form-span-4');
  const radio5 = document.querySelector('.footer-form-span-5');
  let arrtask = [];
  let blockss;

  await getBlock().then(response => blockss = response);
  if (blockss) {
    blockss.forEach( block => {
      if (block.id == getBlockId())
      headerName.innerHTML = block.name;
    })
  }   

  console.log(blockss);

  user.addEventListener('click', event => {
    event.preventDefault();
    dropDown.classList.toggle('user-info-open');
  });

  imgStar.addEventListener('click', () => {
    if(imgStar) {
      imgStarBackground.style.display = 'block';
      imgStar.style.display = 'none';
    }
  });

  imgStar.title = 'important';
  imgBurger.title = 'sorting';
  
  imgStarBackground.addEventListener('click', () => {
    if (imgStarBackground) {
      imgStarBackground.style.display = 'none';
      imgStar.style.display = 'block';
    }
  });    

  imgBurger.addEventListener('click', () => {
    divSort.classList.toggle('sort-block');
  });

  blockAddImg.addEventListener('click', () => {
    if (arrtask.length <= 99) {
      displayTask();
    }
  });

  const radioTitle = radio => {
    radio.setAttribute('title', 'Select color');
  }
  
  radioTitle(radio1);
  radioTitle(radio2);
  radioTitle(radio3);
  radioTitle(radio4);
  radioTitle(radio5);

  radio1.addEventListener('click', () => { 
    radioColor('#c9c1cc');
  });

  radio2.addEventListener('click', () => {
    radioColor('#9DB4C6');
  });

  radio3.addEventListener('click', () => {
    radioColor('#C1CAA6');
  });

  radio4.addEventListener('click', () => {
    radioColor('#B3B8B5');
  });

  radio5.addEventListener('click', () => {
    radioColor('#CDBDBD');
  });

  const radioColor = color => {
    todolist.style.background = color; 
    footer.style.background = color; 
    headerName.style.background = color; 
  }

  const displayTask = async () => {
    const todolistContent = document.querySelector('.todolist-wrapper');
    const divContent = document.createElement('div');
    const divCircle = document.createElement('div');
    const contentInput = document.createElement('div');
    const input = document.createElement('textarea');
    const imgDelet = document.createElement('img');
    const imgSave = document.createElement('img');

    const task = {
      userId: getPersonalData().id,
      name: null,
      date: null,
      Time: null,
      input_value: null,
      completed: false,
      blockId: getBlockId(),
    }

    arrtask.push(task);

    divContent.className = 'todolist-wrapper-content';
    divCircle.className = 'todolist-wrapper-content-circle';
    contentInput.className = 'todolist-wrapper-content-input';
    input.className = 'todolist-header-input';
    imgDelet.className = 'todolist-wrapper-content-input-img';
    imgSave.className = 'todolist-wrapper-content-img-save';
    
    imgDelet.src = '/image/delete.png'; 
    imgSave.src = '/image/save.png';
    input.placeholder = 'Change Text';
    input.maxLength = 200;
   
    todolistContent.append(divContent);
    divContent.append(divCircle, imgSave);
    divContent.appendChild(contentInput);
    contentInput.append(input, imgDelet);
    todolistContent.appendChild(blockAdd);

    if (task.completed) {
      divCircle.setAttribute('clicked', true)
      input.classList.add('task-color');
      divCircle.classList.add('circle-background');
      divCircle.setAttribute('title', 'uncompleted');
    } else {
      divCircle.removeAttribute('clicked');
      divCircle.setAttribute('title', 'completed');
    }

    divCircle.addEventListener('click', () => {
      let isClicked = divCircle.getAttribute('clicked');

      if (isClicked) {
        divCircle.setAttribute('clicked', true);
        task.completed = true;
        updateTask(task);
        textarea.classList.add('task-color');
        divCircle.classList.add('circle-background');
      } else {
        divCircle.removeAttribute('clicked');
        task.completed = false;
        updateTask(task);
        divCircle.className = 'todolist-wrapper-content-circle';
        input.className = 'todolist-wrapper-content-input-task';
      }
    });

    imgSave.addEventListener('click', async () => {
      task.input_value = input.value;
      task.date = moment().format();
      task.Time = moment().format('LTS');
      await createTask(task);
    });

    imgDelet.addEventListener('click', async () => {
      let tasks;
      await getTask().then(response => tasks = response);
      tasks.forEach( task => {
        imgDelet.onclick = async () => {
          divContent.remove(); 
          await deleteTask(task);
        }
      });
    });

  }

}
export const renderTask = async () => {
  const blockAdd = document.querySelector('.todolist-add');
  let tasks;
  let users;
  let blocks;

  await getTask().then(response => tasks = response);
  await getUsers().then(response => users = response);
  await getBlock().then(response => blocks = response);
  
  tasks.forEach( task => {
    const { completed } = task;
    const user = users.find(user => user.id === task.userId);
    if (user.uuid === getUID() && task.blockId == getBlockId()) {
      const todolistContent = document.querySelector('.todolist-wrapper');
      const divContent = document.createElement('div');
      const divCircle = document.createElement('div');
      const contentInput = document.createElement('div');
      const textarea = document.createElement('textarea');
      const imgDelet = document.createElement('img');
      const imgSave = document.createElement('img');

      divContent.className = 'todolist-wrapper-content';
      divCircle.className = 'todolist-wrapper-content-circle';
      contentInput.className = 'todolist-wrapper-content-input';
      textarea.className = 'todolist-wrapper-content-input-task';
      imgDelet.className = 'todolist-wrapper-content-input-img';
      imgSave.className = 'todolist-wrapper-content-img-save';

      imgDelet.src = '/image/delete.png'; 
      imgDelet.title = 'delete';
      imgSave.title = 'save';
      imgSave.src = '/image/save.png';
      textarea.placeholder = 'Change Text';
      textarea.maxLength = 200;

      textarea.innerHTML = task.input_value;

      todolistContent.append(divContent);
      divContent.append(divCircle, imgSave);
      divContent.append(contentInput);
      contentInput.append(textarea, imgDelet);
      todolistContent.appendChild(blockAdd);

      imgDelet.onclick = async () => {
        divContent.remove();
        await deleteTask(task);
      }

      if (completed) {
        divCircle.setAttribute('clicked', true)
        textarea.classList.add('task-color');
        divCircle.classList.add('circle-background');
      } else {
        divCircle.removeAttribute('clicked');
      }

      divCircle.addEventListener('click', () => {
        let isClicked = divCircle.getAttribute('clicked');
        if (!isClicked) {
          divCircle.setAttribute('clicked', true);
          task.completed = true;
          updateTask(task);
          textarea.classList.add('task-color');
          divCircle.classList.add('circle-background');
        } else {
          divCircle.removeAttribute('clicked');
          task.completed = false;
          updateTask(task);
          divCircle.className = 'todolist-wrapper-content-circle';
          textarea.className = 'todolist-wrapper-content-input-task';
        }
      });
    }

  });
}