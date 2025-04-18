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
    login: async (_parent: any, { username, password }: { username: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ username });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user._id);
      return { token, user };
    },
    updateSubcategory: async (
      _parent: any,
      {
        categoryId,
        subcategoryInput: { name, amount },
      }: { categoryId: string; subcategoryInput: { name: string; amount: number } },
      context: IUserContext
    ) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      const user = await User.findById(context.user._id);
    
      if (!user) {
        throw new Error('User not found');
      }
    
      // Find the category inside user's budget
      const category = user.budget.id(categoryId);
    
      if (!category) {
        throw new Error('Category not found');
      }
    
      // Find the subcategory inside the category
      const existingSubcategory = category.subcategories.find(
        (subcat: any) => subcat.name === name
      );
    
      if (existingSubcategory) {
        existingSubcategory.amount = amount;
      } else {
        category.subcategories.push({ name, amount });
      }
    
      await user.save();
      return category;
    },
  },
};

export default resolvers;
