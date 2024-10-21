import React, {useEffect, useRef, useState} from 'react';
import styles from './relatedProducts.module.css';
import {gql, useQuery} from '@apollo/client';
import { Star, ChevronDown } from 'react-feather';
import ReviewForm from './reviewForm';
import { FormattedMessage } from 'react-intl';
import Rating from '../Rating/rating';


 const GET_PRODUCTS_REVIEWS = gql`
    query getProductReviews(
        $sku: String!
        ) {
            products(filter: { sku: { eq: $sku } }) {
                items {
                    uid
                    review_count
                    rating_summary
                    reviews {
                        items {
                            average_rating
                            summary
                            text
                            created_at
                            nickname
                        }
                    }
                }
            }
        }
    `;

const Reviews = (props) => {

    const [isExpanded, setIsExpanded] = useState(true);
    const [initialHeight, setInitialHeight] = useState(150);
    const descriptionRef = useRef(null);

    const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    };
    
    const { error, loading, data: reviews } = useQuery(GET_PRODUCTS_REVIEWS, {
        variables: { sku: props.sku},
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    useEffect(() => {
      if (reviews) {
        // console.log(reviews, 'from useEffect reviews with rating');
      }
    }, [loading])

    return (
        <>
            <div className={styles.reviewsBarContainer}>
                <div className={styles.reviewsBar} onClick={toggleExpand}>
                    <h2 className={styles.reviewsTitle}><FormattedMessage id="Reviews" defaultMessage="Reviews" /> <span className={styles.reviewsCont}>({reviews?.products?.items[0]?.reviews?.items.length})</span></h2>
                    <span><ChevronDown size={25} strokeWidth={1} style={{rotate: isExpanded ? '180deg' : ''}} /></span>
                </div>
            </div>

            <div ref={descriptionRef} className={`${styles.containerReviews} ${isExpanded ? styles.hAuto : ''}`}
                style={{overflow: isExpanded ? 'hidden' : 'auto'}}
            >
                <div className={styles.inner}>
                    {reviews && reviews?.products?.items[0]?.reviews?.items?.map((review, index) => (
                        <div key={index}>
                            <div className={styles.summary}> {review.summary} - by {review.nickname} {review.created_at} </div>
                            <div className={styles.rating}> <span className={styles.quality}> <FormattedMessage id="Quality:" defaultMessage="Quality:" /></span>
                                <ul style={{display: 'flex', alignItems:'center'}}>
                                    <Rating rating={review.average_rating} />  
                                </ul>
                            </div>
                            <div className={styles.longText}> {review.text} </div>
                        </div>
                    ))}
                    <ReviewForm sku={props.sku} />
                </div>
            </div>
        </>
    );
}

export default Reviews;
