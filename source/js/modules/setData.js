import {ref, push, child, update} from 'firebase/database';
import {database} from './init-firebase';

const newData = (data) => {
  const date = new Date();

  const postData = {
    price: data.price,
    sec: date.getSeconds(),
    min: date.getMinutes(),
    hours: date.getHours(),
    day: date.getDay(),
    mounth: date.getMonth(),
  };

  const newPostKey = push(child(ref(database), 'products/' + data.category + '/')).key;
  const updates = {};
  updates['products/' + data.category + '/' + newPostKey] = postData;

  return update(ref(database), updates);
};

export {newData};
