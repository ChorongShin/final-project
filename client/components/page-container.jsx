import React from 'react';

// const styles = {
//   page: {
//     minHeight: 'calc(100vh - 3.5rem)'
//   }
// };

export default function PageContainer({ children }) {
  return (
    <div className="bg-light vh-100">
      <div className="container vh-100">
        { children }
      </div>
    </div>
  );
}
