import React, {Fragment, useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';

function ProductListingQuery() {

    const ProductListingFragment = gql`
      query GetProductData($pageSize: Int!, $currentPage: Int!) {
      products(filter: { name: { match: "" } }, pageSize: $pageSize, currentPage: $currentPage) {
        items {
          id,
          uid,
          name,
          sku,
          stock_status,
          url_key,
          image {
            url
          }
          price_range {
            minimum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
            }
          }
          review_count
          rating_summary
        }
      }
    }
    `;

    const GET_PRODUCT_LISTING = gql`
    query getProductListing($cartId: String!) {
            cart(cart_id: $cartId) {
                id
                ...ProductListingFragment
            }
        }
        ${ProductListingFragment}
    `;

    const { error, loading, data: items } = useQuery(GET_PRODUCT_LISTING, {
        variables: { pageSize: 20, currentPage: 1 },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });


    return (
        <div>ProductListingQuery</div>
    )
}

export default ProductListingQuery