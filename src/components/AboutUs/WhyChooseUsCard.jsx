import React from 'react';

const WhyChooseUsCard = ({ icon, title }) => {
  return (
    <div className="text-center p-4 shadow-sm rounded bg-white">
      <div className="mb-3 text-danger" style={{ fontSize: '40px' }}>
        {icon}
      </div>
      <h5 className="fw-bold">{title}</h5>
    </div>
  );
};

export default WhyChooseUsCard;
