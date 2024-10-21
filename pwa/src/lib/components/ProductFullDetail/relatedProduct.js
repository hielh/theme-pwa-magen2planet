import React, {useEffect, useState} from 'react';
import styles from '../ProductsComponents/products.module.css';
import { Link } from 'react-router-dom';
import Image from '@magento/venia-ui/lib/components/Image';
import AddToCartRelatedProduct from './addToCartRelatedProduct';
import { Info, ShoppingBag, Eye, Heart, BarChart, ShoppingCart, Star } from 'react-feather';
import { useAddToCartButton } from '@magento/peregrine/lib/talons/Gallery/useAddToCartButton';
import ProductPopup from '../ProductsComponents/productpopup';
import Rating from '../Rating/rating';



const RelatedProduct = (props) => {

    const [popupProduct, setProduct] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    const {
        cartItems,
    } = props;

    const productUrlSuffix = ".html";
    const product = props.product
    const index = props.index
    const item  = product
    
    const talonProps = useAddToCartButton({
        item,
        productUrlSuffix
    });
    const UNSUPPORTED_PRODUCT_TYPES = [
        'VirtualProduct',
        'BundleProduct',
        'GroupedProduct',
        'DownloadableProduct'
    ];

    const isInStock = item.stock_status === 'IN_STOCK';

    const productType = item.__typename;
    const isUnsupportedProductType = UNSUPPORTED_PRODUCT_TYPES.includes(
        productType
    );
    const isDisabled = !isInStock || isUnsupportedProductType;

    const { handleAddToCart } = talonProps;
    

    const handlePopoupClose = () => {
            setShowPopup(false)
      };
    

    return (
        <>
            {
                showPopup && (<div> <ProductPopup
                    product={product} 
                    onClose={handlePopoupClose}
                    key={product.uid}
                    item={product}
                    cartItems={cartItems}
                /> </div> ) 
            }

            <div key={index} className={styles.card} >
                {index % 2 === 1 && <span className={styles.productDiscount}>-40%</span>}
                <div className={styles.imageHolder}>
                    <Link
                        to={`/${product.url_key}${productUrlSuffix}`}
                    >
                    <Image resource={product.thumbnail.url} alt={product.name} className={styles.image} />
                    </Link>
                    <div className={styles.icons}>
                        <span data-tooltip={isDisabled ? "Not Supported" : "Add to Cart"} style={{backgroundColor: isDisabled ? 'grey' : '', borderRadius: '50%'}}  onClick={handleAddToCart}
                         className={`${styles.iconsBackground} ${isDisabled ? '' : styles.addToCartButton}`}><ShoppingCart size={20}/></span>
                        <span id={product.uid} 
                            onClick={() => {
                                setProduct(product);
                                setShowPopup(true);
                            }}  size={20} data-tooltip="Quick View" className={styles.iconsBackground}><Eye  /></span>
                        <span data-tooltip="Add to Wishlist" className={styles.iconsBackground}><Heart size={20} /></span>
                        <span data-tooltip="Add to Compare" className={styles.iconsBackground}><BarChart size={20} /></span>
                    </div>
                </div>
                <div className={styles.details}>
                    <Link
                        to={`/${product.url_key}${productUrlSuffix}`}
                    >
                        <h2 className={styles.name}>{product.name}</h2>
                    </Link>
                    <div className={styles.footer}>
                        <Rating rating={product.rating_summary} />
                        <span
                            className={styles.price}>${product.price_range.minimum_price.final_price.value.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RelatedProduct;