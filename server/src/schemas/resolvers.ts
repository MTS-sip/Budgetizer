import type IUserContext from '../interfaces/UserContext.js';
import type IUserDocument from '../interfaces/UserDocument.js';
import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth-service.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
      
      if (context.user) {

        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('User not authenticated');
    },
  },
  Mutation: {
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user._id);
      return { token, user };
    },
    updateSubcategory: async (_parent: any, { username, input }: { username: string; input: { category: string; name: string; amount: number } }, context: IUserContext) => {
      if (!context.user || context.user.username !== username) {
        throw new AuthenticationError('Not authorized to update this user');
      }
    
      const { name, amount } = input;
    
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
    
      const budgetCategory = user.budget.find(cat => cat.name === name);
    
      if (!budgetCategory) {
        throw new Error(`Budget category "${name}" not found`);
      }
    
      // Check if the subcategory already exists
      const existingSub = budgetCategory.subcategories.find(sub => sub.name === name);
    
      if (existingSub) {
        // If subcategory exists, update it
        existingSub.amount = amount;
      } else {
        // If not, push a new one
        budgetCategory.subcategories.push({ name , amount });
      }
    
      await user.save();
      return user;
    }
  },
};

export default resolvers;
