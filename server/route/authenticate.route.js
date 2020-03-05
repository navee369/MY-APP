import express from 'express'
import authCtrl from '../controllers/authenticate.controller'

const router = express.Router()

// to sign in for user
router.route('/auth/signin').post(authCtrl.signin)


router.route('/auth/signout').get(authCtrl.signout)

modules.export default router
