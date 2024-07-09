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


const Product = (props) => {

    const [product, setProduct] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    const {
        handleLinkClick,
        item,
        itemRef,
        wishlistButtonProps,
        isSupportedProductType
    } = useGalleryItem(props);

    const { storeConfig } = props;
    const productUrlSuffix = storeConfig.product_url_suffix;
    // console.log(storeConfig);
    const { name, price_range, image: { url: small_image }, url_key, rating_summary } = item;
    const { url: smallImageURL } = small_image;
    const productLink = `/${url_key}${productUrlSuffix}`;
    const addButton =  (
        <AddToCartButton item={item} urlSuffix={productUrlSuffix} />
    ) ;
    // const priceSource =
    //     price_range.maximum_price.final_price ||
    //     price_range.maximum_price.regular_price;
    
    const talonProps = useAddToCartButton({
        item,
        productUrlSuffix
    });
    // console.log(talonProps);

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
    

    return (

        <>

            <div>
            {showPopup && <ProductPopup product={product} onClose={handlePopoupClose} />}
            </div>
        <div key={item.uid} className={styles.card} ref={itemRef}>
            {/* {index % 2 === 1 && <span className={styles.productDiscount}>-40%</span>} */}
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
                        <Button data-tooltip="Add to Cart" priority="high" type="button" onPress={handleAddToCart} className={styles.iconsBackground}><ShoppingCart size={20}/></Button>
                        <span id={item.uid} 
                            onClick={() => {
                            setProduct(item);
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
                    {addButton}
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