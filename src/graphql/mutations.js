import { gql } from '@apollo/client';

export const ADD_RATING = gql`
  mutation AddRating($productId: String!, $ratingValue: Float!, $review: String!) {
    addRating(productId: $productId, ratingValue: $ratingValue, review: $review)
  }
`;
