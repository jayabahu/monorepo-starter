import { gql } from "@apollo/client";

export const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      image
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      name
      email
      image
    }
  }
`;

export const USER_UPDATED_SUBSCRIPTION = gql`
  subscription UserUpdated {
    userUpdated {
      id
      name
      email
      image
    }
  }
`;
