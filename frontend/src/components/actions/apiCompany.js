import { API } from '../../config';
import queryString from 'query-string';

export const getCurrentCompany = (slug) => {
  return fetch(`${API}/companies/${slug}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCurrentView = (slug) => {
  return fetch(`${API}/companies/view/${slug}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAverageRating = (slug) => {
  return fetch(`${API}/averageRating/${slug}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createComment = (comment) => {
  return fetch(`${API}/comment`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((response) => {
      return response.json();
      console.log('aaa la:' + response.json());
    })
    .catch((err) => console.log(err));
};

export const like = (name, id) => {
  return fetch(`${API}/like/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(name),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const reply = (data, id) => {
  return fetch(`${API}/reply/${id}`, {
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

export const violateReport = (data, id) => {
  return fetch(`${API}/violate/${id}`, {
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

export const listSearch = (params) => {
  console.log('search params', params);
  let query = queryString.stringify(params);
  console.log('query params', query);
  return fetch(`${API}/company/search?${query}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createCompany = (company) => {
  return fetch(`${API}/admin/company/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: company,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeCompany = (slug) => {
  return fetch(`${API}/admin/company/delete/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const singleCompany = (slug) => {
//   return fetch(`${API}/admin/company/${slug}`, {
//     method: 'GET',
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

export const editSingleCompany = (slug, company) => {
  return fetch(`${API}/admin/company/${slug}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
    },
    body: company,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getHandleStatusAPI = (status) => {
  return fetch(`${API}/admin/company/status/${status}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
