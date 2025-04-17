import { Schema } from 'mongoose';

export interface ISubcategory {
  name: string;
  amount: number;
}

export const subcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

export interface ICategory {
  category: string;
  subcategories: ISubcategory[];
}

export const categorySchema = new Schema<ICategory>({
  category: { type: String, required: true },
  subcategories: {
    type: [subcategorySchema],
    required: true,
    default: [],
  },
});
