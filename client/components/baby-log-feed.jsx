import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default class BabyLogFeed extends React.Component {
  delete(babyLogId) {
    this.props.deleteBabyLog(babyLogId);
  }

  render() {
    return (
      this.props.babyLogs.map(babyLog => {
        const date = Object.keys(babyLog)[0];

        const items = babyLog[date].map(item => (
    <li key={item.babyLogId}>
      <div className="row mt-2">
        <div className="col-4">
                <p className="log">{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div className="col-4">
                <p className="log">{item.typeOfCare}</p>
        </div>
              <div className="col-4">
            <button type="button" className="btn btn-danger me-md-2 edit-button" onClick={() => this.delete(item.babyLogId)}>
                  <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>

    </li>
        ));

        return (
          <li key={date} className="px-0">
            <p className="color-p text-center mb-0 fs-4">{moment(date).format('MMMM D, YYYY')}</p>
      <ul className="px-0 text-center">{items}</ul>
    </li>
        );
      })
    );
  }
}
