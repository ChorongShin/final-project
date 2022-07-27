import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
import Video from './video';

export default class AuthPage extends React.Component {

  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    return (
       <>
        <div className="col-5 video-display">
          <Video />
        </div>
       <div className="col-5">
          <div className="card p-3 card-position">
          <header className="text-center">
            <h2 className="mb-3">
              Welcome to Baby Journey
              {/* Please Sign In or Register Your Baby&apos;s Virtual World */}
            </h2>
          </header>
          <div>
            <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
          </div>
        </div>
        </div>

      </>
    );
  }
}

AuthPage.contextType = AppContext;
