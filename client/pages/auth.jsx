import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
import Video from './video';

export default class AuthPage extends React.Component {

  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="profiles" />;

    const welcomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';

    return (
       <>
        <div className="col-5 video-display">
          <Video />
        </div>
          <div className="card py-4 card-position">
          <header className="text-center">
            <p className="welcome-font">
              Welcome to Baby&apos;s Journey
            </p>
            <p className="message-font">
              {welcomeMessage}
            </p>
          </header>
          <div>
            <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
          </div>
        </div>
      </>
    );
  }
}

AuthPage.contextType = AppContext;
