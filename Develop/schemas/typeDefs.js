const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String! ): Auth
    saveBook(author: String!, description: String!, title: String!, bookId: ID!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: number
    savedBooks: [String]!
  }

  type Book {
    _id: bookId
    authors: String
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID
    user: user
  }
`;

module.exports = typeDefs;
