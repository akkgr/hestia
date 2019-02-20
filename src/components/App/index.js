import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Layout } from 'antd'

import { FirebaseContext } from '../Firebase'
import { AuthUserContext } from '../Session'

import * as ROUTES from '../../constants/routes'
import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import BuildingsPage from '../Buildings'

const { Header, Content, Footer } = Layout

const App = () => {
  const firebase = useContext(FirebaseContext)
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  )

  useEffect(() => {
    const listener = firebase.onAuthUserListener(
      authUser => {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setAuthUser(authUser)
      },
      () => {
        localStorage.removeItem('authUser')
        setAuthUser(null)
      }
    )
    return () => {
      listener()
    }
  }, [])

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <Layout className="layout full-height">
          <Header>
            <Navigation />
          </Header>
          <Content style={{ padding: '10px 50px' }}>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.BUILDINGS} component={BuildingsPage} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Cinnamon Design ©2018 Created by Cinnamon Software
          </Footer>
        </Layout>
      </Router>
    </AuthUserContext.Provider>
  )
}

export default App
