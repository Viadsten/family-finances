import {ref, child, get, onValue, update, push} from 'firebase/database';
import {database} from './init-firebase';
// baseCallbacks
import {renderProductList} from './list-presenter';
import {calcMonthlyExpense} from './expense-statistic';

let baseItems = [];

// функция показывает данные из базы
// const getDataFromBase = (path, cb) => {
//   const dbRef = ref(database);
//   get(child(dbRef, 'products/' + path)).then((snapshot) => {
//     if (snapshot.exists()) {
//       cb(snapshot.val());
//     } else {
//       throw new Error('No data available');
//     }
//   }).catch((error) => {
//     throw new Error(error);
//   });
// };

const createBaseItems = (base) => {
  baseItems = [];

  for (let key in base) {
    if (Object.prototype.hasOwnProperty.call(base, key)) {
      for (let items in base[key]) {
        if (Object.prototype.hasOwnProperty.call(base, key)) {
          const itemKey = base[key][items];
          Object.assign(itemKey, {
            name: key,
            uid: items,
          });
          baseItems.push(itemKey);
        }
      }
    }
  }
};

const addNewData = (data) => {
  const date = new Date();

  const postData = {
    price: data.price,
    sec: date.getSeconds(),
    min: date.getMinutes(),
    hours: date.getHours(),
    day: date.getDate(),
    weekDay: date.getDay(),
    mounth: date.getMonth(),
  };

  const newPostKey = push(child(ref(database), 'products/' + data.category + '/')).key;
  const updates = {};
  updates['products/' + data.category + '/' + newPostKey] = postData;

  return update(ref(database), updates);
};

const removeFromData = (path, uid) => {
  const updates = {};
  updates['products/' + path + '/' + uid] = null;

  return update(ref(database), updates);
};

const setBaseObserver = () => {
  const starCountRef = ref(database, 'products/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    baseUpdateCallbacks(data);
  });
};

const baseUpdateCallbacks = (base) => {
  createBaseItems(base); // создает массив baseItems из всех категорий
  renderProductList(baseItems);
  calcMonthlyExpense(baseItems);
};

export {setBaseObserver, addNewData, removeFromData};
