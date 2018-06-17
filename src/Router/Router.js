import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import store from '../Store/stores'
import Config from '../Constant/Config'
import RedirectTo from '../Constant/RedirectTo'
import Layout from '../Component/Layout/Layout'
import LandingPage from '../Component/Layout/Landing/LandingPage'
import LoginPage from '../Component/Layout/Login/LoginPage'
import SignupPage from '../Component/Layout/Signup/SignupPage'
import NamePage from '../Component/Layout/Name/NamePage'
import HomePage from '../Component/Home/HomePage'

/* if(performance.navigation.type == 1){
  window.location.href= Config.HOME_URL;
} */

axios.defaults.baseURL = Config.AXIOS_DEFAULTS_BASE_URL;

const Router = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Layout>
          <Route exact path='/' component={LandingPage} />
          <Route path={RedirectTo.LOGIN} component={LoginPage} />
          <Route path={RedirectTo.SIGNUP} component={SignupPage} />
          <Route path={RedirectTo.ADD_NAME} component={NamePage} />
          <Route path={RedirectTo.HOME} component={HomePage} />
          <Route path={RedirectTo.LOGOUT} component={LandingPage} />
          </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default Router