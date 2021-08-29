const {body} = require('express-validator')

const User = require('../../models/userModel')


module.exports = [
    body('name')
        .isLength({min:6, max : 30})
        .withMessage('Name Must Be Between 6 to 30 Chars')
        .trim()
    ,
    body('phone')
        .isLength({min : 11})
        .withMessage('Mobile Number Must Be In 11 Digit')
        .trim()
    ,
    body('address')
        .not()
        .isEmpty()
        .withMessage('Please Provide Valid Address')
        .trim()
    ,
    body('nid')
        .not()
        .isEmpty()
        .withMessage('Please Provide Nid Number')
    ,
    body('role')
        .not()
        .isEmpty()
        .isIn(['farmer','buyer'])
        .withMessage('Role is required')
    ,
    body('email')
        .isEmail()
        .withMessage('Please Provide a Valid Email')
        .normalizeEmail()
        .custom(async email => {
            let user = await User.findOne({email})
            if(user){
                return Promise.reject('Email Already Used')
            }
        })
    ,
    body('password')
        .isLength({min : 5})
        .withMessage('Password Must Be Greater Than 5 Chars')
    ,
    body('confirmPassword')
    .isLength({min : 5})
    .withMessage('Password Does Not Match')
        .custom((confirmPassword, {req}) => {
            if(confirmPassword !== req.body.password){
                throw new error ('Password Does Not Match')
            }
            return true
        })
]