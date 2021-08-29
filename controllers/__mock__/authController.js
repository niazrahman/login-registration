const User = require('../../models/userModel')

let users = [
    {
        id: '1',
        name: 'Mahir',
        phone: '01989856715',
        address: 'test address',
        nid: 'test nid',
        role: 'farmer',
        email: 'test@test.com',
        password: 'testpass'
    }
]

exports.signupPostController = async (user) => {
    // const user = new User(user)

    // let createdUser = await user.save();
    // createdUser.id = '2';
    // users.push(createdUser);
    // return createdUser
    return '2'
}