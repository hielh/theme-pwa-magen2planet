import { gql } from '@apollo/client';
export const reviewForm = gql`mutation 

createProductReview(
    $sku:String!
    $nickname:String!
    $summary:String!
    $text:String!
    $ratings: [ProductReviewRatingInput!]!
){
    createProductReview(
        input: {
            sku: $sku,
            nickname: $nickname,
            summary: $summary,
            text: $text,
            ratings: $ratings
        }
    ) {
        review {
            nickname
            summary
            text
            average_rating
            ratings_breakdown {
                name
                value
            }
        }
    }
}
`;
export default {
    createAccount: reviewForm
}