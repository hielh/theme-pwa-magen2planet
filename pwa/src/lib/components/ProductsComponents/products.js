import React, {Fragment, useEffect, useState} from 'react';
import styles from './products.module.css';
import {gql, useQuery} from '@apollo/client';
import { Link } from 'react-router-dom';
import { Eye, Heart, BarChart, ShoppingCart, Star } from 'react-feather';
import Image from "@magento/venia-ui/lib/components/Image";
import sliderClasses from "@magento/pagebuilder/lib/ContentTypes/Slider/slider.module.css";
import SlickSlider from "react-slick";
import ImageZoom from './imagezoom';
import HomeSlider from './homeslider';
import Features from '../Features';
import Categories from './categories';
import Promos from './promos';
import Reviews from './reviews';
import ProductPopup from './productpopup';
import News from './news';
import { useGallery } from '@magento/peregrine/lib/talons/Gallery/useGallery';
import { useProductListing } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProductListing';
import Product  from './product';


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

  // function disableScroll() {
  //     // Get the current page scroll position
  //     const scrollTop = window.scrollY;
  //     const scrollLeft = window.scrollX;

  //         // if any scroll is attempted,
  //         // set this to the previous value
  //         window.onscroll = function () {
  //             window.scrollTo(scrollLeft, scrollTop);
  //         };
  // }

  // function enableScroll() {
  //   window.onscroll = function () { };
  // }

  const talonProps = useGallery();
  const { storeConfig } = talonProps;

  const [product, setProduct] = useState({});

  const [showPopup, setShowPopup] = useState(false);



    const LOAD_PRODUCTS = gql`
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

    const { error, loading, data } = useQuery(LOAD_PRODUCTS, {
        variables: { pageSize: 20, currentPage: 1 }
    });
    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    const handlePopoupClose = () => {
      // setTimeout(
      //   () => {
          setShowPopup(false)
          // enableScroll() 
        // }, 1000)
    };
    

    return (
      <Fragment>
      
      {/* <HomeSlider/> */}
      <Features/>
    {/* <div>
      {showPopup && <ProductPopup product={product} onClose={handlePopoupClose} />}
    </div> */}
      <Categories/>
      <Promos/>
      {/* <ImageZoom src={'http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/t/vt11-ll_main.jpg'} zoomScale={3} /> */}

{/* ############################ Products section ############################ */}
        <div>
          <div className={styles.header}>
            <h2 className={styles.headerH2}>New Arrivals</h2>
            <nav>
              <ul className={styles.navList}>
                <li className={styles.navListLi}>Milks & Creams</li>
                <li className={styles.navListLi}>Fruits</li>
                <li className={styles.navListLi}>Vegetables</li>
                <li className={styles.navListLi}>Ocean Foods</li>
              </ul>
            </nav>
          </div>
        <div className={styles.container}>
            {data?.products?.items.map((product, index) => (
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
                >

                </Product>
            ))}
        </div>
        </div>

{/* ############################ Reviews section ############################ */}
  <Reviews/>
{/* ############################ News section ############################ */}
  <News/>
      </Fragment>
    );
};

export default Products;
