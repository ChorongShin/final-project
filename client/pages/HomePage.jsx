import React from 'react';
import AppContext from '../lib/app-context';
import BabyEntryButtons from '../components/BabyEntryButtons';
import BabyLogFeed from '../components/BabyLogFeed';
import Footer from '../components/Footer';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      babyLogs: [],
      babyProfiles: []
    };
    this.addLogs = this.addLogs.bind(this);
    this.deleteBabyLog = this.deleteBabyLog.bind(this);
  }

  componentDidMount() {
    // const req = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-Access-Token': window.localStorage.getItem('token-jwt')
    //   }
    // };

    fetch('/api/babyLogs')
      .then(res => res.json())
      .then(babyLogs => this.setState({ babyLogs }))
      .catch(err => console.error(err));

    fetch('/api/profiles')
      .then(res => res.json())
      .then(babyProfiles => this.setState({ babyProfiles }))
      .catch(err => console.error(err));
  }

  addLogs(newTodo) {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        typeOfCare: newTodo.typeOfCare
      })
    };

    fetch('/api/babyLogs', req)
      .then(res => res.json())
      .then(babyLog => {
        const logsCopy = [...this.state.babyLogs];
        const date = babyLog.createdAt;
        const index = logsCopy.findIndex(log => Object.keys(log)[0] === date);
        let logs = null;

        if (index !== -1) {
          logs = logsCopy[index];
        } else {
          logs = { [date]: [] };
        }

        logs[date] = [...logs[date], babyLog];
        logsCopy[index] = logs;

        this.setState({
          babyLogs: logsCopy
        });
      });
  }

  deleteBabyLog(babyLogId) {

    fetch(`/api/babyLogs/${babyLogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(babyLog => {
        const logsCopy = [...this.state.babyLogs];
        const date = babyLog.createdAt;
        const index = logsCopy.findIndex(log => Object.keys(log)[0] === date);

        logsCopy[index][date] = [...logsCopy[index][date]].filter(log => log.babyLogId !== babyLog.babyLogId);

        this.setState({
          babyLogs: logsCopy
        });
      });
  }

  render() {

    return (
      <>
        <BabyEntryButtons onSubmit={this.addLogs}/>
        <BabyLogFeed babyLogs={this.state.babyLogs} deleteBabyLog={this.deleteBabyLog}/>

        <Footer onSubmit={this.addLogs} />

        </>
    );
  }

}

HomePage.contextType = AppContext;
