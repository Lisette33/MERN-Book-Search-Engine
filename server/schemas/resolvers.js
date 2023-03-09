const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent,args,context) => {
      return context.user;
    }
  },
  Mutation:{
    login: async(parent,args,context)=>{
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        throw new AuthenticationError('Cannot login');
      }
  
      const correctPw = await user.isCorrectPassword(args.password);
  
      if (!correctPw) {
        throw new AuthenticationError('Cannot login');
      }
      const token = signToken(user);
      return ({ token, user });
    },
    addUser: async(parent,args,context)=>{
      const user = await User.create(args);
        if (!user) {
          throw new AuthenticationError('Cannot login');
        }
        const token = signToken(user);
        return ({ token, user });
    },
    saveBook: async(parent,args,context)=>{
      console.log(context.user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
      return (updatedUser);
    } catch (err) {
      console.log(err);
      throw new AuthenticationError('Error');
    }
    },
    removeBook: async(parent,args,context)=>{
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new AuthenticationError('Error');
      }
      return (updatedUser);
    },
  }
};



module.exports = resolvers;