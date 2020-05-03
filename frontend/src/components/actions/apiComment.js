
import { API } from '../../config';

export const getNewestComment = () => {
  return fetch(`${API}/comment`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const removeComment = (idComment) => {
  return fetch(`${API}/admin/comment/delete/{idComment}`, {
    method: 'DELETE',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};