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

export const getFilteredCompany = (skip, limit) => {
  const data = {
      limit,
      skip
      
  };
  return fetch(`${API}/company/by/search`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};