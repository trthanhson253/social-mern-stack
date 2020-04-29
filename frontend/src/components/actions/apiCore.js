import { API } from '../../config';

export const getCompany = () => {
  return fetch(`${API}/company`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getNewestComment = () => {
  return fetch(`${API}/comment`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
