import { gql } from '@apollo/client';

const typeDefs = gql`

  type Subcategory {
    name: String!
    amount: Float!
  }

  type Category {
    id: ID!
    name: String!
    subcategories: [Subcategory!]!
  }

  input SubcategoryInput {
    name: String!
    amount: Float!
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    budget: [BudgetCategory!]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input SubcategoryInput {
    name: String!
    amount: Float!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    updateSubcategory(categoryId: ID!, subcategoryInput: SubcategoryInput!): Category!
  }

`;

export default typeDefs;