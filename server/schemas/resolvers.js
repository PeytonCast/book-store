// TODO
// * `resolvers.js`: Define the query and mutation functionality to work with the Mongoose models.
// **Hint**: Use the functionality in the `user-controller.js` as a guide.
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
        // get me 
        me: async (parent, args, context) => {
            // user Bearer {token}
            // select returns everything exept for the password and version
            if (context.user){
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            
            }
            throw new AuthenticationError('You need to be logged in!'); 
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
        
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
        //   find a user by the _id then take the saveBook input and add to set
          saveBook:  async (parent, {bookData}, context)=> {
            // if there is a contex.user, continue on else throw err
            if(context.user){
                // typeDef is retunrming a user so i need to return a user
                const updateUser = await User.findOneAndUpdate(

                    { _id : context.user._id},
                    // add saveBook to the set
                    {
                        $push: {savedBooks : bookData}
                    },
                    { new: true }
                    
                    );
                    return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeBook:  async (parent, {bookId}, context)=> {
            // if ther is a contex.user, continue on else throw err
            // console.log({context, bookId, parent})
            if(context.user){
                // typeDef is retunrming a user so i need to return a user
                try{const updateUser = await User.findOneAndUpdate(
                    // find user id 
                     { _id: context.user._id },
                    //  remove bookId form that user
                     { $pull: { savedBooks: {bookId} } },
                     { new: true }
                    );
                    return updateUser;}
                    catch(err){
                      console.log({err})
                    }
            }
            // if user token is not there LOGIN
            throw new AuthenticationError('You need to be logged in!');
          },
        },
        

};
module.exports = resolvers;