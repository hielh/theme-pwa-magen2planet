import React, { useState, useEffect, useCallback } from 'react';
import styles from './productpopup.module.css';
import { Heart, Share, RefreshCcw, CreditCard, MessageCircle, X, Star, Facebook, Twitter, Linkedin } from 'react-feather';
import ImageZoom from './imagezoom';
import { useProduct } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProduct';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { CartPageFragment } from '@magento/peregrine/lib/talons/CartPage/cartPageFragments.gql.js';
import { AvailableShippingMethodsCartFragment } from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/ShippingMethods/shippingMethodsFragments.gql.js';
import ProductObject from '../TextInput/fileJSobject';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useAddToCartHook } from '../../customHooks/useAddToCartHook';

const ProductPopup = (props) => {

    const [productQuantity, setProductQuantity] = useState(0);
    const [disabledMinusQuantity, setDisabledMinusQuantity] = useState(false);
    const [isUpdatingCart, setIsUpdatingCart] = useState(false);
    const [isZoomingOut, setIsZoomingOut] = useState(false);

    const { 
         product,
         onClose,
        //  storeConfig,
        //  selectedProduct,
        //  setActiveEditItem,
        //  setIsCartUpdating,
        //  onAddToWishlistSuccess,
        //  fetchCartDetails,
        //  wishlistConfig,
         cartItems,
    } = props;

    const item = product
    const {
        handleAddToCart,
        isDisabled,
        isInStock,
    } = useAddToCartHook({ item, urlSuffix: '.html' });

    
    useEffect(() => {
        console.log(product, 'product');
        
        if(cartItems.length > 0) {
            let itemExist = cartItems.find(cartItem => cartItem.product.uid === product.uid);
            if(itemExist) {
                setProductQuantity(itemExist.quantity);
            } else {
                setProductQuantity(0);
            }
        }
    }, [isUpdatingCart])

    const [{ cartId }] = useCartContext();
    const [, { dispatch }] = useEventingContext();

    const handleAddToCartFunctionnality = async ()=> {
        if(getCartItem()){
            await handleUpdateItemQuantity()
        }
        else{
            setIsUpdatingCart(true);
            await handleAddToCart(productQuantity)
            setIsUpdatingCart(false);
            await closeAfterAddToCart()
        }
    }

    const [
        updateItemQuantity,
        {
            loading: updateItemLoading,
            error: updateError,
            called: updateItemCalled
        }
    ] = useMutation(UPDATE_QUANTITY_MUTATION);

    const handleUpdateItemQuantity = useCallback(
        async quantity => {
            try {
                setIsUpdatingCart(true);
                await updateItemQuantity({
                    variables: {
                        cartId,
                        itemId: getCartItem().uid,
                        quantity: productQuantity
                    }
                });

                setIsUpdatingCart(false);

                const selectedOptions = null; // just pour le moment
            } catch (err) {
                // Make sure any errors from the mutation are displayed.
                console.log(err.message);
                
            }
        },
        [cartId, dispatch, product, updateItemQuantity, productQuantity]
    );

    const handleRaiseQuantity = () => {
        setProductQuantity(productQuantity + 1);
        setDisabledMinusQuantity(false);
    }

    const handleLowerQuantity = () => {
        if(productQuantity > 1) {
            setProductQuantity(productQuantity - 1);
            setDisabledMinusQuantity(false);
        }
        else {
            setDisabledMinusQuantity(true);
            setProductQuantity(0);
        }
    }

    function getCartItem() {
        if (cartItems.length > 0) {
            let item = cartItems.find(item => item.product.uid === product.uid);
            if (item) {
                return item;
            }
            return undefined;
          }
        return undefined;
    }

    const closeProductPopup = (e) => {
        if(e.target.id === 'overlayClickClose'){
            setIsZoomingOut(true);
            setTimeout(() => onClose(), 300);
        }
    }


    const closeProductPopupButton = () => {
            setIsZoomingOut(true);
            setTimeout(() => onClose(), 300);
    }

    const closeAfterAddToCart = async () => {
            setIsUpdatingCart(true);
            setIsZoomingOut(true);
            await setTimeout(() => onClose(), 500);
    }

  return (
    <>
    <div className={styles.overlay} id='overlayClickClose' onClick={closeProductPopup} >
        <div className={isZoomingOut ? styles.outPopup : styles.mainPopup}>
        <p className={styles.closeButton} onClick={closeProductPopupButton} style={{cursor: 'pointer'}} ><X size={30} strokeWidth={1}/></p> 
            {/* start header */}
            <div className={styles.header}>
                <div>
                    <p className={styles.headerTitle}>Ocean Spray 100% Juice -10 Ounce Bottle</p>
                    <ul style={{display: 'flex', }}>
                            <li> <Star size={15} fill='#ffcc00' style={{color: '#ffcc00'}}/> </li>
                            <li> <Star size={15} fill='#ffcc00' style={{color: '#ffcc00'}}/> </li>
                            <li> <Star size={15} fill='#ffcc00' style={{color: '#ffcc00'}}/> </li>
                            <li> <Star size={15} fill='#ffcc00' style={{color: '#ffcc00'}}/> </li>
                            <li> <Star size={15} fill='#dddddd' style={{color: '#dddddd'}}/> </li>
                    <span style={{marginLeft: '30px'}}>SKU: <span className={styles.sku}>{product.sku}</span></span>
                    </ul>
                </div>
                {/* <p onClick={onClose} style={{cursor: 'pointer'}} ><X size={30} strokeWidth={1}/></p> */}
                <ul style={{display: 'flex', gap: '15px'}}>
                    <li> <Facebook size={30} style={{color: 'blue'}}/> </li>
                    <li> <Twitter size={30} style={{color: 'green'}}/> </li>
                    <li> <Linkedin size={30} style={{color: 'red'}}/> </li>
                </ul>
            </div>
            {/* end header */}
            {/* start body */}
            <div className={styles.body}>
                <div className={styles.image}>
                    <span className={styles.minus}>-40%</span>
                    <img className={styles.imageImg} src={product?.image?.url || product?.thumbnail?.url} alt='Ocean Spray 100% Juice -10 Ounce Bottle' />
                    {/* <ImageZoom src={product?.image?.url} zoomScale={3} /> */}
                </div>
                {/* start product-details */}
                <div className={styles.details}>
                    <h2 className={styles.price}>${product.price_range.minimum_price.regular_price.value.toFixed(2)}</h2>
                    <span className={styles.status}>In stock</span>
                    <p className={styles.desc}>Curabitur at lacus ac velit ornare lobortis. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Ut varius tincidunt libero.</p>
                    <a href='#' className={styles.detailsLink}>see details...</a>
                    <div className={styles.cartDesc}>
                        <div className={styles.Quantity}>
                            <button  
                                className={styles.reduceQuantity}
                                onClick={handleLowerQuantity}
                                disabled={disabledMinusQuantity}
                                style={{cursor: disabledMinusQuantity ? 'not-allowed' : 'pointer'}}
                            >-</button>
                                <input 
                                    className='test' 
                                    style={{maxWidth: '20px', border: 'none'}} 
                                    type='text'
                                    value={productQuantity}
                                    onChange={(e)=>{setProductQuantity(e.target.value)}}
                                >
                                </input>
                            <button  
                                className={styles.increaseQuantity}
                                onClick={handleRaiseQuantity}
                                disabled={isDisabled}
                            >+</button>
                        </div>
                        <button className={styles.addToCart}
                                onClick={handleAddToCartFunctionnality}
                                disabled={isDisabled}
                                style={{backgroundColor: isUpdatingCart ? 'grey' : '', cursor: isUpdatingCart ? 'not-allowed' : 'pointer'}}
                        > { isUpdatingCart ? 'Adding...' : 'Add To Cart' } </button>
                        <p>
                            <Heart size={30} strokeWidth={1}/>
                        </p>
                    </div>
                    <p className={styles.links}>Categories: Organic, Pregnancy & Maternity</p>
                </div>
                {/* end product-details */}

                {/* start sidebar */}
                <div className={styles.sidebar}>
                    <div className={styles.methods}>
                        <div className={styles.method}>
                            <Share className={styles.methodIcon}/>
                            <div>
                                <h5 className={styles.sidebarHeaders}>Free Delivery</h5>
                                <p>For all oders over <br/>$99</p>
                            </div>
                        </div>
                        <div className={styles.method}>
                            <RefreshCcw className={styles.methodIcon}/>
                            <div>
                                <h5 className={styles.sidebarHeaders}>90 Days Return</h5>
                                <p>If goods have <br/>problems</p>
                            </div>
                        </div>
                        <div className={styles.method}>
                            <CreditCard className={styles.methodIcon}/>
                            <div>
                                <h5 className={styles.sidebarHeaders}>Secure Payment</h5>
                                <p>100% secure<br/>payment</p>
                            </div>
                        </div>
                        <div className={styles.method}>
                            <MessageCircle className={styles.methodIcon}/>
                            <div>
                                <h5 className={styles.sidebarHeaders}>24/7 Support</h5>
                                <p>Dedicated support</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.offers}>
                        <h2>Special Offers</h2>
                    </div> */}
                </div>
                {/* end sidebar */}
            </div>
        </div>
    </div>
    </>
  );
};

export default ProductPopup;

export const REMOVE_ITEM_MUTATION = gql`
    mutation removeItem($cartId: String!, $itemId: ID!) {
        removeItemFromCart(
            input: { cart_id: $cartId, cart_item_uid: $itemId }
        ) {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;

export const UPDATE_QUANTITY_MUTATION = gql`
    mutation updateItemQuantity(
        $cartId: String!
        $itemId: ID!
        $quantity: Float!
    ) {
        updateCartItems(
            input: {
                cart_id: $cartId
                cart_items: [{ cart_item_uid: $itemId, quantity: $quantity }]
            }
        ) {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;
