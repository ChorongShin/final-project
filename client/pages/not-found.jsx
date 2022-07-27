import React from 'react';

const styles = {
  pageContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%'
  }
};

export default function NotFound(props) {
  return (
    <div style={styles.pageContent}>
      <div className="row">
        <div className="col text-center mb-5">
          <h3>
           Sorry, we couldn&apos;t find that page....
          </h3>
          <a className="btn btn-Danger" href="#" role="button">Return Home</a>
        </div>
      </div>
    </div>
  );
}
