// `mutations.js`:

// 	* `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.

// 	* `ADD_USER` will execute the `addUser` mutation.

// 	* `SAVE_BOOK` will execute the `saveBook` mutation.

// 	* `REMOVE_BOOK` will execute the `removeBook` mutation.
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }`
//TODO
export const SAVE_BOOK = gql`
  mutation Mutation($saveBookContent3: inputBook!) {
    saveBook(bookData: $saveBookContent3) {
      _id
      email
      savedBooks {
        bookId
        description
        authors
        image
        link
        title
      }
      username
    }
  }
`

export const REMOVE_BOOK = gql`
mutation Mutation($bookId: String!) {
    removeBook(bookId: $bookId) {
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }}
  
`