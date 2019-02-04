import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import AdminPage from '../Admin'

import { Layout } from 'antd'
import * as ROUTES from '../../constants/routes'
import { withAuthentication } from '../Session'

const { Header, Content, Footer } = Layout

const App = () => (
  <Router>
    <Layout className="layout">
      <Header>
        <Navigation />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Cinnamon Design ©2018 Created by Cinnamon Software
      </Footer>
    </Layout>
  </Router>
)

export default withAuthentication(App)
