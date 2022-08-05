/* eslint-disable no-console */
import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Auth from './pages/auth';
import HomePage from './pages/HomePage';
import CreateProfilePage from './pages/createProfilePage';
import NotFound from './pages/not-found';
import PageContainer from './components/page-container';
import Navbar from './components/navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('token-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('token-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('token-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path } = this.state.route;
    console.log('path is: ', path);

    if (path === '') {
      return <Navbar />;
    }

    // if the user hasn't created a baby profile, go to the profile page
    if (path === 'profiles') {
      return <CreateProfilePage />;
    }

    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }

    if (path === 'home') {
      return <HomePage />;
    }

    return <NotFound />;

  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };

    return (
      <AppContext.Provider value={contextValue}>
          <PageContainer>
              {this.renderPage()}
          </PageContainer>
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
