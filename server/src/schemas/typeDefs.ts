import { gql } from 'graphql';

const typeDefs = gql`

  type Subcategory {
    name: String!
    amount: Float!
  }

  type BudgetCategory {
    category: String!
    subcategories: [Subcategory!]!
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
    updateSubcategory(username: String!, input: SubcategoryInput!): User
  }
`;

export default typeDefs;