import React, {useState} from 'react';
import styles from './products.module.css';
import { useGalleryItem } from '@magento/peregrine/lib/talons/Gallery/useGalleryItem';
import AddToCartButton from '@magento/venia-ui/lib/components/Gallery/addToCartButton';
import { Info, ShoppingBag, Eye, Heart, BarChart, ShoppingCart, Star } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Image from '@magento/venia-ui/lib/components/Image';
import { useAddToCartButton } from '@magento/peregrine/lib/talons/Gallery/useAddToCartButton';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from '@magento/venia-ui/lib/components/Button';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import ProductPopup from './productpopup';
import Quantity from '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity';
// import ProductStepper from './productStepper';


const Product = (props) => {

    const [product, setProduct] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    const {
        onAddToWishlistSuccess,
        setIsCartUpdating,
        fetchCartDetails,
        setActiveEditItem,
        wishlistConfig,
        cartItems,
        index
    } = props;

    const {
        handleLinkClick,
        item,
        itemRef,
        wishlistButtonProps,
        isSupportedProductType
    } = useGalleryItem(props);

    const { storeConfig, selectedProduct } = props;
    const productUrlSuffix = ".html";  //  const productUrlSuffix = storeConfig.product_url_suffix
    // console.log(storeConfig);
    const { name, price_range, image: { url: small_image }, url_key, rating_summary } = item;
    const { url: smallImageURL } = small_image;
    const productLink = `/${url_key}${productUrlSuffix}`;
    const addButton =  (
        <AddToCartButton item={item} urlSuffix={productUrlSuffix} />
    ) ;
    
    const talonProps = useAddToCartButton({
        item,
        productUrlSuffix
    });

    const { handleAddToCart, isDisabled, isInStock } = talonProps;
    const AddToCartIcon = (
        <Icon
            classes={{ icon: styles.productDiscount }}
            src={ShoppingBag}
            attrs={{ width: 16 }}
        />
    );

    const buttonInStock = (
        <Button
            data-cy="AddToCartButton-buttonInStock"
            disabled={isDisabled}
            onPress={handleAddToCart}
            priority="high"
            type="button"
        >
            {/* {AddToCartIcon} */}
            <span>
                ADD TO CART
            </span>
        </Button>
    );
    

    const handlePopoupClose = () => {
        // setTimeout(
        //   () => {
            setShowPopup(false)
            // enableScroll() 
          // }, 1000)
      };

    function getProductQuantity() {
        itemExist = cartItems.find(cartItem => cartItem.product.uid === item.uid);
        if(itemExist != undefined) {
            return itemExist.quantity;
        } else {
            return 0;
        }
    }
    

    return (

        <>

{/* <ProductStepper productItem={selectedProduct}></ProductStepper> */}
            {
                
                    showPopup && (<div> <ProductPopup
                            product={product} 
                            onClose={handlePopoupClose}
                            key={product.uid}
                            item={product}
                            storeConfig={storeConfig}
                            selectedProduct={product}
                            setActiveEditItem={setActiveEditItem}
                            setIsCartUpdating={setIsCartUpdating}
                            onAddToWishlistSuccess={onAddToWishlistSuccess}
                            fetchCartDetails={fetchCartDetails}
                            wishlistConfig={wishlistConfig}
                            cartItems={cartItems}
                            handleAddToCart={handleAddToCart}
                            getProductQuantity={getProductQuantity}
                            isDisabled={isDisabled}
                    /> </div> )
                
            }
        <div key={item.uid} className={styles.card} ref={itemRef}>
            {index % 2 === 1 && <span className={styles.productDiscount}>-40%</span>}
                <div className={styles.imageHolder}>
                    {/* <Image resource={smallImageURL} alt={name} className={styles.image} /> */}
                    <Link
                        onClick={handleLinkClick}
                        to={productLink}
                    >
                    {/* <img src={item.image.url} alt={name} className={styles.image}/> */}
                    <Image resource={item.image.url} alt={name} className={styles.image} />
                    </Link>
                    <div className={styles.icons}>
                        <span data-tooltip={isDisabled ? "Not Supported" : "Add to Cart"} style={{backgroundColor: isDisabled ? 'grey' : '', borderRadius: '50%'}}  onClick={handleAddToCart} className={styles.iconsBackground}><ShoppingCart size={20}/></span>
                        <span id={item.uid} 
                            onClick={() => {
                            setProduct(item);
                            // setProduct(cartItems.find(cartItem => cartItem.product.uid === item.uid));
                            // disableScroll()
                            setShowPopup(true);
                            }}  size={20} data-tooltip="Quick View" className={styles.iconsBackground}><Eye  /></span>
                        <span data-tooltip="Add to Wishlist" className={styles.iconsBackground}><Heart size={20} /></span>
                        <span data-tooltip="Add to Compare" className={styles.iconsBackground}><BarChart size={20} /></span>
                    </div>
                </div>
            <div className={styles.details}>
                <Link
                onClick={handleLinkClick}
                to={productLink}
                >
                    <h2 className={styles.name}>{name}</h2>
                </Link>
                    {/* {addButton} */}
                <div className={styles.footer}>
                    <ul style={{display: 'flex'}}>
                        <li> <Star size={18} style={{color: 'yellow'}}/> </li>
                        <li> <Star size={18} style={{color: 'yellow'}}/> </li>
                        <li> <Star size={18} style={{color: 'yellow'}}/> </li>
                        <li> <Star size={18} style={{color: 'yellow'}}/> </li>
                        <li> <Star size={18} style={{color: 'grey'}}/> </li>
                    </ul>
                    <span
                        className={styles.price}>${item.price_range.minimum_price.regular_price.value.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
        </>
    );
}

export default Product;