import { API } from '../../config';

export const getRequest = () => {
  return fetch(`${API}/admin/request`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getToggleStatus = (idRequest, status1) => {
  return fetch(`${API}/admin/request/${idRequest}/${status1}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeRequest1 = (idRequest) => {
  return fetch(`${API}/admin/request/delete/${idRequest}`, {
    method: 'DELETE',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getNewestRequest = () => {
  return fetch(`${API}/admin/request/newestRequestCount`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
