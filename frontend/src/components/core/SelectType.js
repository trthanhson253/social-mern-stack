import React, { useState } from 'react';

const SelectType = ({ handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };
  return (
    <select style={{ width: '80px' }} onChange={handleChange}>
      <option value="">-By Type-</option>

      <option value="0">Product</option>
      <option value="1">Service</option>
      <option value="2">Consultancy</option>
    </select>
  );
};

export default SelectType;
