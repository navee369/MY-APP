import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Signup from './person/Signup'
import Signin from './authenticate/Signin'
import EditProfile from './person/edit'
import Profile from './person/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './blog/Menu'

class MainRouter extends Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    return (<div>
      <Menu/>
      <Switch>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
      </Switch>
    </div>)
  }
}

modules.export default MainRouter
