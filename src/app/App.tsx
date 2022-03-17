import React, { useEffect } from 'react';
import useDarkMode from "use-dark-mode";
import {ReactNotifications} from 'react-notifications-component'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import { Layout } from "./layout/layout";
import { ROUTES } from './core/data/routes';
import { WalletProvider } from './core/context-provider/wallet/wallet-provider';
import { LoadingOverlayProvider } from './core/context-provider/loading-overlay/loading-overlay-provider';

import Home from "./pages/home/home";
import MyGeishas from "./pages/my-geishas/my-geishas";
import Marketplace from "./pages/marketplace/marketplace_backup";

import "../app/pages/styles/app.sass";
import 'react-notifications-component/dist/theme.css'
import Dashboard from "./pages/dashboard/dashboard";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {

  const darkMode = useDarkMode(true);

  useEffect(() => {
    darkMode.enable();
  })

  return (
      <div>
        <ReactNotifications/>
        <WalletProvider>
          <Router>
            <LoadingOverlayProvider>
              <Layout>
                <Switch>
                  <Redirect exact from="/" to={ ROUTES.home }/>
                  <Route exact path={ `${ ROUTES.home }` } component={ Home }/>
                  <Route exact path={ `${ ROUTES.market }` } component={ Marketplace }/>
                  <Route exact path={ `${ ROUTES.myGeishas }` } component={ MyGeishas }/>
                  <Route exact path={ `${ ROUTES.dashboard }` } component={ Dashboard }/>
                </Switch>
              </Layout>
            </LoadingOverlayProvider>
          </Router>
        </WalletProvider>
      </div>
  );
}


export default App;
