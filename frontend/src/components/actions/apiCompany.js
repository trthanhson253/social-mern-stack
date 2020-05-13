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

export const love = (slug) => {
  return fetch(`${API}/company/love/${slug}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const dislike = (id) => {
  return fetch(`${API}/dislike/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

// export const listSearchCompanyAPI = (params) => {
//   console.log('search params', params);
//   let query = queryString.stringify(params);
//   console.log('query params', query);
//   return fetch(`${API}/company/search?search=${query}`, {
//     method: 'GET',
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

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

export const alreadyLiked = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('like-' + data._id, JSON.stringify(data._id));
    next();
  }
};

export const isAlreadyLiked = (idComment) => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('like-' + idComment)) {
    return JSON.parse(localStorage.getItem('like-' + idComment));
  } else {
    return false;
  }
};

// export const alreadyReply = (data, next) => {
//   if (typeof window !== 'undefined') {
//     sessionStorage.setItem('reply-' + data._id, JSON.stringify(data._id));
//     next();
//   }
// };

// export const isAlreadyReply = (idComment) => {
//   if (typeof window == 'undefined') {
//     return false;
//   }
//   if (sessionStorage.getItem('reply-' + idComment)) {
//     return JSON.parse(sessionStorage.getItem('reply-' + idComment));
//   } else {
//     return false;
//   }
// };

export const alreadyReport = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('report-' + data._id, JSON.stringify(data._id));
    next();
  }
};

export const isAlreadyReport = (idComment) => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('report-' + idComment)) {
    return JSON.parse(localStorage.getItem('report-' + idComment));
  } else {
    return false;
  }
};

export const alreadyDislike = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dislike-' + data._id, JSON.stringify(data._id));
  }
};

export const isAlreadyDislike = (idComment) => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('dislike-' + idComment)) {
    return JSON.parse(localStorage.getItem('dislike-' + idComment));
  } else {
    return false;
  }
};

export const alreadyLoved = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('love-' + data._id, JSON.stringify(data._id));
  }
};

export const isAlreadyLoved = (idCompany) => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('love-' + idCompany)) {
    return JSON.parse(localStorage.getItem('love-' + idCompany));
  } else {
    return false;
  }
};
