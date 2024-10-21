import React, {Fragment, useEffect, useMemo} from 'react';
import styles from './products.module.css';
import {gql, useQuery} from '@apollo/client';
import Features from '../Features';
import Categories from './categories';
import Promos from './promos';
import Reviews from './reviews';
import News from './news';
import { useGallery } from '@magento/peregrine/lib/talons/Gallery/useGallery';
import { useProductListing } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProductListing';
import Product  from './product';
import { FormattedMessage } from 'react-intl';


const Products = (props) => {

  const {
    onAddToWishlistSuccess,
    setIsCartUpdating,
    fetchCartDetails
  } = props;
  
  const {
      activeEditItem,
      isLoading,
      error :errorListing,
      items,
      setActiveEditItem,
      wishlistConfig
  } = useProductListing();

  const talonProps = useGallery();
  const { storeConfig } = talonProps;

    const LOAD_PRODUCTS = gql`
      query categoryList($ids: [String!]) {
      categoryList(filters: {ids: { in: $ids }}){
        uid
        children_count
        name
        products {
          items {
            id,
            uid,
            name,
            sku,
            description {
                html
            },
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
    }
    `;

    const { error, loading, data } = useQuery(LOAD_PRODUCTS, {
      variables: { ids: [5]},
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    useEffect(() => {
        if (data) {
            // console.log(data, 'new Categories');
        }
    }, [data]);

    const renderProducts = (products) => {
      return products.map((product) => (
        <Product
            key={product.uid}
            item={product}
            storeConfig={storeConfig}
            selectedProduct={product}
            setActiveEditItem={setActiveEditItem}
            setIsCartUpdating={setIsCartUpdating}
            onAddToWishlistSuccess={onAddToWishlistSuccess}
            fetchCartDetails={fetchCartDetails}
            wishlistConfig={wishlistConfig}
            cartItems={items}
            index={product.uid}
        >
        </Product>
      ));
    };

    const memoizedProducts = useMemo(() => {
      return data?.categoryList[0]?.products?.items || [];
    }, [data]);
    

    return (
      <Fragment>
      <Features/>
      <Categories/>
      <Promos/>
{/* ############################ Products section ############################ */}
        <div>
          <div className={styles.header}>
            <h2 className={styles.headerH2}><FormattedMessage id="New Arrivals" defaultMessage="New Arrivals" /></h2>
            <nav>
              <ul className={styles.navList}>
                {/* <li className={styles.navListLi}>Milks & Creams</li>*/}
              </ul>
            </nav>
          </div>
        <div className={styles.container}>
          {renderProducts(memoizedProducts)}
        </div>
        </div>

{/* ############################ Reviews section ############################ */}
  <Reviews/>
{/* ############################ News section ############################ */}
  <News/>
      </Fragment>
    );
};

export default React.memo(Products);
