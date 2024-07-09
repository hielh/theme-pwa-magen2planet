import React from 'react';
import styles from './promos.module.css';


const Promos = () => {
    return (
        <div className={styles.promoSection}>
            <div className={styles.promoItem}>
                <img
                    src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/t/vt12-kh_main.jpg"
                    alt="Fresh Summer With Pineapple Juice"
                    className={styles.promoImage}
                />
                <div className={styles.promoContent}>
                    <h2 className={styles.promoContentH2}>Fresh Summer With Pineapple Juice</h2>
                    <p>Just <span className={styles.promoContentPrice}>$159.99</span></p>
                    <button className={styles.shopNowButton}>Shop now</button>
                </div>
            </div>
            <div className={styles.promoItem}>
                <img
                    src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/t/vt11-ll_main.jpg"
                    alt="Raw Fish Seabass With Spices"
                    className={styles.promoImage}
                />
                <div className={styles.promoContent}>
                    <h2 className={styles.promoContentH2}>Raw Fish Seabass With Spices</h2>
                    <p>Sale <span className={styles.salePrice}>25% off</span></p>
                    <button className={styles.shopNowButton}>Shop now</button>
                </div>
            </div>
        </div>
    );
}

export default Promos;