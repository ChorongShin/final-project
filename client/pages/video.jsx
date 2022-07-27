import React from 'react';
import AppContext from '../lib/app-context';

export default class Video extends React.Component {
  render() {
    return (
   <div className="background-video">
        <video type="video/mp4"
          autoPlay
          loop
          muted
          id="video">
          <source
            src="/video/baby.mp4" />
        </video>
        </div>
    );
  }
}

Video.contextType = AppContext;
