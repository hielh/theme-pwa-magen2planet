import React, {Fragment, useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';

export const useGetRelatedProducts = ({ sku }) => {

    const RELATED_PRODUCTS = gql`
      query getRelatedProducts($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
            uid
            name
            related_products {
                uid
                name
            }
            upsell_products {
                uid
                name
            }
            crosssell_products {
                uid
                name
            }
            }
        }
    }
    `;

    const { error, loading, data: relatedProducts } = useQuery(RELATED_PRODUCTS, {
        variables: { ids: sku},
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    useEffect(() => {        
      if (relatedProducts) {
      }
    }, [loading])
    

    return {
        relatedProducts
    };
};