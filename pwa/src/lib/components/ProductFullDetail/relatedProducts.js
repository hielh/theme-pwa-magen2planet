import React, {useEffect, useRef, useState} from 'react';
import styles from './relatedProducts.module.css';
import { Link } from 'react-router-dom';
import AddToCartRelatedProduct from './addToCartRelatedProduct';
import RelatedProduct from './relatedProduct';
import {gql, useQuery} from '@apollo/client';
import { useProductListing } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProductListing';
import { useGallery } from '@magento/peregrine/lib/talons/Gallery/useGallery';
import Reviews from './reviews';
import { ChevronLeft, ChevronRight } from 'react-feather';


const RELATED_PRODUCTS = gql`
      query getRelatedProducts($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
            uid
            name
            related_products {
                uid
                sku
                name
                stock_status
                url_key
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
                thumbnail {
                    url
                }
            }
            upsell_products {
                uid
                name
                sku
                stock_status
                url_key
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
                thumbnail {
                    url
                }
            }
            crosssell_products {
                uid
                name
                sku
                stock_status
                url_key
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
                thumbnail {
                    url
                }
            }
            }
        }
    }
    `;

const RelatedProducts = (props) => {

    const relatedContainerRef = useRef(null);
    const upsellContainerRef = useRef(null);
    const crossSellContainerRef = useRef(null);

    const btnPressPrev = (referenceContainer) => {
        let width = referenceContainer.current.clientWidth;
        if(width > 800)
        referenceContainer.current.scrollLeft = referenceContainer.current.scrollLeft - width;
        else
        referenceContainer.current.scrollLeft = referenceContainer.current.scrollLeft - 240;
    }

    const btnPressNext = (referenceContainer) => {
        let width = referenceContainer.current.clientWidth;
        if(width > 800)
        referenceContainer.current.scrollLeft = referenceContainer.current.scrollLeft + width;
        else
        referenceContainer.current.scrollLeft = referenceContainer.current.scrollLeft + 240;
    }
    
    const { error, loading, data: relatedProducts } = useQuery(RELATED_PRODUCTS, {
        variables: { sku: props.product.sku},
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
  
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

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
      if (relatedProducts) {
        // console.log(relatedProducts?.products?.items[0]?.crosssell_products, 'from useEffect relatedProducts');
      }
    }, [loading, isLoading, talonProps])
    

    // console.log(relatedProducts, 'product.sku'); // VA11-GO-NA

    return (
        <>
            <Reviews sku={props.product.sku} />
            {relatedProducts?.products?.items[0]?.related_products.length > 0 && 
            <div className={styles.headingWrapper}>
                <div className={styles.headingTitle}>
                    <h2 className={styles.relatedHeading}>Related Products</h2>
                        <button className={styles.preBtn} onClick={() => btnPressPrev(relatedContainerRef)}><ChevronLeft size={50} strokeWidth={1} color='#ccc' /></button>
                        <button className={styles.nextBtn} onClick={() => btnPressNext(relatedContainerRef)}><ChevronRight size={50} strokeWidth={1} color='#ccc' /></button>
                </div>
            </div>
            }
            <div className={styles.relatedContainer}>
                <div className={styles.container}  ref={relatedContainerRef}>
                    {relatedProducts && relatedProducts?.products?.items[0]?.related_products?.map((product, index) => (
                        <RelatedProduct 
                            product={product}
                            selectedProduct={product}
                            index={index}
                            cartItems={items}
                            key={index}
                        />
                    ))}
                </div>
            </div>


            {relatedProducts?.products?.items[0]?.upsell_products.length > 0 && 
            <div className={styles.headingWrapper}>
                <div style={{marginTop: '50px'}} className={styles.headingTitle}>
                    <h2 className={styles.relatedHeading}>Upsell Products</h2>
                        <button className={styles.preBtn} onClick={() =>  btnPressPrev(upsellContainerRef)}><ChevronLeft size={50} strokeWidth={1} color='#ccc' /></button>
                        <button className={styles.nextBtn} onClick={() => btnPressNext(upsellContainerRef)}><ChevronRight size={50} strokeWidth={1} color='#ccc' /></button>
                </div>
            </div>
            }
            <div className={styles.relatedContainer}>
                <div className={styles.container}  ref={upsellContainerRef}>
                    {relatedProducts && relatedProducts?.products?.items[0]?.upsell_products?.map((product, index) => (
                        <RelatedProduct 
                            product={product}
                            selectedProduct={product}
                            index={index}
                            cartItems={items}
                            key={index}
                        />
                    ))}
                </div>
            </div>


            {relatedProducts?.products?.items[0]?.crosssell_products.length > 0 && 
                <div className={styles.headingWrapper}>
                    <div style={{marginTop: '50px'}} className={styles.headingTitle}>
                        <h2 className={styles.relatedHeading}>CrossSell Products</h2>
                            <button className={styles.preBtn} onClick={() => btnPressPrev(crossSellContainerRef)}><ChevronLeft size={50} strokeWidth={1} color='#ccc' /></button>
                            <button className={styles.nextBtn} onClick={() => btnPressNext(crossSellContainerRef)}><ChevronRight size={50} strokeWidth={1} color='#ccc' /></button>
                    </div>
                </div>
            }
            <div className={styles.relatedContainer}>
                <div className={styles.container}  ref={crossSellContainerRef}>
                    {relatedProducts && relatedProducts?.products?.items[0]?.crosssell_products?.map((product, index) => (
                        <RelatedProduct 
                            product={product}
                            selectedProduct={product}
                            index={index}
                            cartItems={items}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default RelatedProducts;