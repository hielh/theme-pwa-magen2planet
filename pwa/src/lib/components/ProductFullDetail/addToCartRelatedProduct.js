import React, {useEffect, useState} from 'react';
import styles from './relatedProducts.module.css';
import { useAddToCartButton } from '@magento/peregrine/lib/talons/Gallery/useAddToCartButton';



const AddToCartRelatedProduct = (props) => {

    const [ripple, setRipple] = useState(false);

    const triggerRipple = () => {
        setRipple(true);
        setTimeout(() => setRipple(false), 500);
    }

    const productUrlSuffix = ".html";
    const item = props.product;
    const talonProps = useAddToCartButton({
        item,
        productUrlSuffix
    });
    const { handleAddToCart } = talonProps;
    

    return (
        <>
           <span onClick={triggerRipple} > <button className={`${styles.addToCart} ${ripple ? styles.ripple : ''}`}  onClick={ handleAddToCart }> Add to Cart</button> </span> 
        </>
    );
}

export default AddToCartRelatedProduct;