import React from 'react';

const CompanyStatus = ({ getHandleStatus }) => {
  const handleChangeStatus = (e) => {
    // setStatus(e.target.value);
    getHandleStatus(e.target.value);
  };
  return (
    <div className="filter-group">
      <label>Status</label>
      <select
        className="form-control"
        name="status"
        onChange={handleChangeStatus}
      >
        <option value="2">Any</option>
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </select>
    </div>
  );
};

export default CompanyStatus;
