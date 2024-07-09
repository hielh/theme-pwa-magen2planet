import React from 'react';
import styles from './news.module.css';


const News = () => {
    return (
        <div className={styles.newsSection}>
        <div className={styles.header}>
          <h2 className={styles.headerH2}>News</h2>
          <nav>
            <ul className={styles.navList}>
              <li className={styles.navListLi}>Review Product</li>
              <li className={styles.navListLi}>Tips & Tricks</li>
              <li className={styles.navListLi}>Promotions</li>
              <li className={styles.navListLi}>See All</li>
            </ul>
          </nav>
        </div>
        <div className={styles.newsItems}>
          <div className={styles.newsItem}>
              <img className={styles.newsItemImg} src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/d/vdl01_main.jpg" alt="Fresh Juice" />
            <div className={styles.newsCategory}>Organic</div>
            <div className={styles.newsItemTitle}>How To Make A Fresh Juice Blended For Your Family?</div>
          </div>
          <div className={styles.newsItem}>
              <img className={styles.newsItemImg} src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/t/vt12-kh_main.jpg" alt="Fresh Juice" />
            <div className={styles.newsCategory}>Organic</div>
            <div className={styles.newsItemTitle}>Fresh Eggs Caroline In Australia Villages</div>
          </div>
          <div className={styles.newsItem}>
              <img className={styles.newsItemImg} src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/v/vvp01_main.jpg" alt="Fresh Juice" />
            <div className={styles.newsCategory}>Organic</div>
            <div className={styles.newsItemTitle}>Discover Fresh Organic Farms In Switzerland Villages</div>
          </div>
          <div className={styles.newsItem}>
              <img className={styles.newsItemImg} src="http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/a/va23_main.jpg" alt="Fresh Juice" />
            <div className={styles.newsCategory}>Business, Tips & Tricks, Organic</div>
            <div className={styles.newsItemTitle}>Products Necessary For Mom</div>
          </div>
        </div>
      </div>
    );
}

export default News;