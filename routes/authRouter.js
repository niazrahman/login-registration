const express = require('express')

const signupValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator')

const authController = require('../controllers/authController')
const router = express.Router()



router.get('/signup',authController.signupGetController)
router.post('/signup',signupValidator,authController.signupPostController)

router.get('/login',authController.loginGetController)
router.post('/login',loginValidator,authController.loginPostController)



module.exports = router