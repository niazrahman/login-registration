const bcrypt = require('bcrypt')

const {validationResult} = require('express-validator')
const errorFormatter = require('../utils/validationErrorFormatter')

const User = require('../models/userModel')

/**
 * This is the controller for getting the signup page. It will render the signup page for * the User
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */

exports.signupGetController = (req,res,next) =>{
    res.status(200).render('pages/auth/signup', {
        title : 'Register Your Account' , 
        error : {}, 
        value : {}
    })
}

/**
 * This is the controller for handling signup requests. It will validate if the user's 
 * provide wrong input. We are hashing the password for security purpose. And will 
 * redirect the user if the signup process is successfull. And if there is an Error, it  
 * will catch error globally.
 * 
 * @param {any} req -> Client Request
 * @param {any} res -> Response Object send from server
 * @param {any} next 
 */

exports.signupPostController = async (req,res,next) =>{
    let {name,phone,address,nid,role,email,password} = req.body 
    let errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return res.render('pages/auth/signup', 
        {
            title : 'Register Your Account',
            error : errors.mapped(),
            value : {
                name,phone,address,nid,email,password
            }
            
        })
    }

    try{
        let hashedPassword = await bcrypt.hash(password,11)
        let user = new User({
            name,
            phone,
            address,
            nid,
            role,
            email,
            password :hashedPassword
        })
       let createdUser = await user.save() 
       console.log('user created sucessfully',createdUser)
       res.redirect('/pages/auth/login', {title : 'Log In to your account'});
       return createdUser
    }catch(err){
        console.log(err)
        next(err)
    }
}


/**
 * This is the controller for getting the login page. It will render the login page for 
 * the User.
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */

exports.loginGetController = (req,res,next) =>{
    console.log(req.get('cookie'))
    res.render('pages/auth/login', {title : 'Login Your Account',error:{}})
}

/**
 * This is the controller for handling login request. It will validate if the user's input 
 * is relevant with the data saved in the databse. And then will fetch the user's 
 * credentials from the databse to check if the user's credential is matched with the 
 * given input. If the request is succesfull it will redirect the User to respective pages 
 * based on their roles. And if any errors occures, it will be handled by global error 
 * handler.
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */


exports.loginPostController = async (req,res,next) =>{
    let {email, password} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return res.render('pages/auth/login', 
        {
            title : 'Login Your Account',
            error : errors.mapped(),        
        })
    }

    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                status: 'Failed',
                message : 'Invalid Credentials'
            })
        }

        let match = await bcrypt.compare(password,user.password)

        if(!match){
            return res.status(404).json({
                status : 'Failed',
                message : 'Invalid Credentials'
            })
        }
        res.setHeader ('set-Cookie', 'isLoggedIn=true')
        res.render('pages/auth/login' , {title : 'Login Your Account'});
        return user;

    }catch(err){
        console.log(err)
        next(err)
    }
}

