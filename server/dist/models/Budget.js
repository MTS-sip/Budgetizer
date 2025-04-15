import { Schema, model } from 'mongoose';
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subcategories: [
        {
            name: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
        },
    ],
});
const Category = model('Category', categorySchema);
export { categorySchema };
export default Category;
