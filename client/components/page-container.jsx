import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        { children }
      </div>
    </div>
  );
}
