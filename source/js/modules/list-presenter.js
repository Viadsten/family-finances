import {removeFromData} from './api';

const timeoutArr = [];

const createItem = (list, item) => {
  const liTemplate = `
    <li class="result-list__item" data-uid="${item.uid}" data-path="${item.name}">
      <span class="result-list__name">${item.name}</span>
      <span class="result-list__price">${item.price}</span>
      <button class="result-list__item-del delete-btn" type="button">
        <span class="delete-btn__del-icon">
          <svg width="30" height="30" aria-hidden="true">
            <use xlink:href="#delete"></use>
          </svg>
        </span>
        <span class="delete-btn__circle">
          <svg viewBox="0 0 36 36" width="39" height="39">
            <circle class="btn__animated-circle" cx="-18" cy="18" r="15.5" transform="rotate(-90)"></circle>
          </svg>
        </span>
      </button>
    </li>`;

  list.insertAdjacentHTML('afterbegin', liTemplate);
  addItemEvents(list.firstChild.nextSibling);
};

const createItemDay = (list, item) => {
  const date = dateСonversion({
    day: item.day,
    mounth: item.mounth,
  });

  const liTemplate = `
    <li class="result-list__item result-list__item--date">
      <p>${date}</p>
    </li>`;

  list.insertAdjacentHTML('afterbegin', liTemplate);
};

const removeItemAction = (e) => {
  const btn = e.target;
  const item = btn.closest('.result-list__item');
  const path = item.dataset.path;
  const uid = item.dataset.uid;

  const deleteItem = () => {
    removeFromData(path, uid);
  };

  if (btn.classList.contains('is-anim')) {
    btn.classList.remove('is-anim');
    timeoutArr.forEach((el) => {
      if (el.id === uid) {
        clearTimeout(el.t);
      }
    });
  } else {
    btn.classList.add('is-anim');
    const timeout = setTimeout(deleteItem, 3000);
    timeoutArr.push({
      t: timeout,
      id: uid,
    });
  }
};

const addItemEvents = (item) => {
  const remove = item.querySelector('.result-list__item-del');
  remove.addEventListener('click', removeItemAction);
};

const twoDigitNum = (num) => {
  return (
    String(num).length === 1
      ? 0 + String(num)
      : num);
};

const dateСonversion = (date) => {
  const now = new Date();
  let convertedDate;

  if (date.day === now.getDate() && date.mounth === now.getMonth()) {
    convertedDate = 'Сегодня';
  } else if (date.day + 1 === now.getDate() && date.mounth === now.getMonth()) {
    convertedDate = 'Вчера';
  } else {
    convertedDate = `${twoDigitNum(date.day) + '.' + twoDigitNum(date.mounth + 1) + '.2022'}`;
  }

  return convertedDate;
};

const sortListDate = () => {
  productsList.sort((a, b) => {
    return new Date(2022, a.mounth, a.day, a.hours, a.min, a.sec) - new Date(2022, b.mounth, b.day, b.hours, b.min, b.sec);
  });
};

let productsList = [];
const renderProductList = (val) => {
  const listNode = document.querySelector('.result-list');
  listNode.innerHTML = '';
  productsList = [];

  for (let key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      for (let items in val[key]) {
        if (Object.prototype.hasOwnProperty.call(val, key)) {
          const itemKey = val[key][items];
          Object.assign(itemKey, {
            name: key,
            uid: items,
          });
          productsList.push(itemKey);
        }
      }
    }
  }

  sortListDate();

  productsList.forEach((item, i) => {
    createItem(listNode, item);

    if (i !== productsList.length - 1) {
      if (item.day !== productsList[i + 1].day) {
        createItemDay(listNode, item);
      }
    } else {
      createItemDay(listNode, item);
    }
  });
};

export {renderProductList};
