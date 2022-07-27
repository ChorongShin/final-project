import React from 'react';
import AppContext from '../lib/app-context';
import AuthPage from './auth';

export default function Home(props) {
  return (
    <>
        <AuthPage />
    </>
  );
}

Home.contextType = AppContext;
