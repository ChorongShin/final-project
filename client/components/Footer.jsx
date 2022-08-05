import React from 'react';
import AppContext from '../lib/app-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faBook } from '@fortawesome/free-solid-svg-icons';

export default class Footer extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    return (
      <div className="row color-footer justify-content-center sticky-bottom">
      <div className="col-2 text-center">
          <button type="button" className="icon-button">
            <a href="#home">
              <img src="/images/babyCare.png" alt="" className="care-icon" />
            </a>
          </button>
      </div>
        <div className="col-2 text-center">
          <button type="button" className="icon-button">
            <a href="#profile" className="color-a">
              <FontAwesomeIcon icon={faChartArea} className="icon" />
            </a>
          </button>
      </div>
        <div className="col-2 text-center" >
          <button type="button" className="icon-button">
            <a href="#home">
              <FontAwesomeIcon icon={faBook} className='icon'/>
            </a>
          </button>
      </div>
        <div className="col-2 text-center">
          <button type="button" className="icon-button">
            <a href="#baby" className="baby-color">
            <img src="/images/Seth.JPG" alt="" className="baby-icon"/>
            <p>Seth</p>
            </a>
          </button>
      </div>
        <div className="col-2 text-center">

          <button type="button" className="icon-button">
            {/* onClick={handleSignOut} */}
              Sign Out
          </button>

        </div>
    </div>
    );
  }
}

Footer.contextType = AppContext;
