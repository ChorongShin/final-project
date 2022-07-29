import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class CareLog extends React.Component {
  render() {
    if (!this.context.user) {
      return <Redirect to="sign-in" />;
    }

  }
}

CareLog.contextType = AppContext;
