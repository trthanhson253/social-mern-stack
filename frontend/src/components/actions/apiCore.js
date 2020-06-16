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

export const getFilteredCompany = (
  skip,
  limit,
  sortBy,
  order,
  filters = {}
) => {
  const data = {
    limit,
    skip,
    sortBy,
    order,
    filters,
  };
  console.log('filters', data);
  return fetch(`${API}/company/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createRequest = (data) => {
  return fetch(`${API}/request/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const paginationCompany = (page) => {
  return fetch(`${API}/admin/companies/?page=${page}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
