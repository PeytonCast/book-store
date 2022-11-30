// TODO
// * `resolvers.js`: Define the query and mutation functionality to work with the Mongoose models.
// **Hint**: Use the functionality in the `user-controller.js` as a guide.
const { AuthenticationError } = require('apollo-server-express');
const { User, } = require('../models');
// const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
        // get me 
        me: async (parent, args, context) => {
            if (context.user){
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!'); 
        },
    }

}
module.exports = resolvers;