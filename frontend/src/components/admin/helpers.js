export const handleCountRequest = (data, next = (f) => f) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('countRequest', JSON.stringify(data));
    next();
  }
};

export const getCountRequest = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('countRequest')) {
      return JSON.parse(localStorage.getItem('countRequest'));
    }
  }
  return 0;
};
