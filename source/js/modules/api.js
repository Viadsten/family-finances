import {ref, child, get, onValue, update, push} from 'firebase/database';
import {database} from './init-firebase';

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

const setBaseObserver = (cb) => {
  const starCountRef = ref(database, 'products/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    cb(data);
  });
};

export {setBaseObserver, addNewData, removeFromData};
