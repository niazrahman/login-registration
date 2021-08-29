const {body} = require('express-validator')

module.exports = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('This Field Can Not Be Empty')
    ,
    body('password')
        .not()
        .isEmpty()
        .withMessage('This Field Can Not Be Empty')
]

