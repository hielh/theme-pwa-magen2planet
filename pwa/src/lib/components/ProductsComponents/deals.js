import React from 'react';
import styles from './deals.module.css';

const Deals = () => {
  return (
    <div className={styles.DealsContainer}>
      <div className={styles.deals}>
        <h2>Deals Hot Of The Day</h2>
        <div className={styles.DealsImages}>
          <img src="" alt="Deal 1" className={styles.selectedDeal} />
          <img src="" alt="Deal 2" />
        </div>
        <div className={styles.dealMainImage}>
          <img src="" alt="Main Deal" />
          <div className={styles.dealDiscount}>-40%</div>
        </div>
        <div>
          <h3 className={styles.detailsH3}>Ocean Spray 100% Juice - 10 Ounce Bottle</h3>
          <div className={styles.dealPrice}>
            <span className={styles.dealCurrentPrice}>$6.00</span>
            <span className={styles.dealOriginalPrice}>$10.00</span>
          </div>
          <div className={styles.dealRating}>
            ★★★★☆ <span>(2)</span>
          </div>
          <div className={styles.dealStock}>Status: In stock</div>
          <div className={styles.dealProgressBar}>
            <div className={styles.dealProgress}></div>
          </div>
          <div className={styles.dealSold}>6/101 Sold</div>
        </div>
      </div>
      <div>
        <h2>Top 20 Bestsellers</h2>
        <ul className={styles.bestsellersUl}>
          <li className={styles.bestsellersLi}>
            <img className={styles.bestsellersImg} src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/a/va24_main.jpg" alt="Product 1" />
            Gerber Lil Crunchies, Ounce Canister - $200.00
          </li>
          <li className={styles.bestsellersLi}>
            <img className={styles.bestsellersImg} src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/a/va22-si_main.jpg" alt="Product 2" />
            Neck Pillows For Babies To Drink Milk - $70.00
          </li>
          <li className={styles.bestsellersLi}>
            <img className={styles.bestsellersImg} src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/d/vdl01_main.jpg" alt="Product 3" />
            Folding High Chair for Babies & Toddlers - <span className={styles.dealDiscountedPrice}>$120.00</span> <span className={styles.dealDriginalPrice}>$150.00</span>
          </li>
          <li className={styles.bestsellersLi}>
            <img className={styles.bestsellersImg} src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/t/vt12-kh_main.jpg" alt="Product 4" />
            LIBWX 3pcs Food Pocket for Infant & - <span className={styles.dealDiscountedPrice}>$10.00</span> <span className={styles.dealDriginalPrice}>$15.00</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Deals;
