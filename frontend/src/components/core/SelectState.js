import React, { useState } from 'react';

const SelectState = ({ states, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };
  return (
    <select style={{ width: '100px' }} onChange={handleChange}>
      <option value="">-By State-</option>
      {states.map((p, i) => (
        <option value={p.abbreviation} key={i}>
          {p.name}
        </option>
      ))}
    </select>
  );
};

export default SelectState;
