import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/IconButton'
import Button from '@material-ui/Button'
import DeleteIcon from '@material-ui-icons/Delete'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/Dialog'
import auth from './../authenticate/help'
import {remove} from './user.js'
import {Redirect, Link} from 'react-router-dom'
import { red100 } from '@material-ui/styles/colors'

class DeleteUser extends Component {
  state = {
    redirect: false,
    open: false
  }
  clickButton = () => {
    this.setState({open: true})
  }
  deleteAccount = () => {
    const jwt = auth.isAuthenticated()
    remove({
      userId: this.props.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        auth.signout(() => console.log('account is removed succesfully'))
        this.setState({redirect: true})
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/'/>
    }
    return (<span>
      <IconButton aria-label="Delete" onClick={this.clickButton} style ={{color : red100}}>
        <DeleteIcon/>
      </IconButton>

      <Dialog open={this.state.open} onClose={this.handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete your account ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            No
          </Button>
          <Button onClick={this.deleteAccount} color="secondary" autoFocus="autoFocus">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
  }
}
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}
modules.export default DeleteUser
