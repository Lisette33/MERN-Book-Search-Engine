import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($name: String!) {
   loginUser(name: $name) {
      _id
      name
      skills
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!) {
   addUser(name: $name) {
      _id
      name
      skills
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($name: String!) {
   saveBook(name: $name) {
      _id
      name
      skills
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($name: String!) {
   removeBook(name: $name) {
      _id
      name
      skills
    }
  }
`;