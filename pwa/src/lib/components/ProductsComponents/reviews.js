import React, {Fragment, useEffect, useState} from 'react';
import styles from './reviews.module.css';


const Reviews = () => {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
    setOffsetY(window.scrollY);
    };

    useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <Fragment>
            <div className={styles.reviews} style={{ '--background-image': `url('http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/d/vdl01_main.jpg')`, backgroundPositionY: offsetY * 0.8 + 'px' }}>
                <div className={styles.cards}>
                <div className={styles.cardReview}>
                    <img className={styles.cardImage} src='http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/v/vvp01_main.jpg' alt='placeholder' />
                    <h4><span style={{fontWeight: 'bold'}}>Kanye West </span>/ Head Chef at BBQ Restaurant</h4>
                    <p className={styles.cardDesc}>Sed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna akal semperFusce commodo molestie luctus.Lorem ipsum Dolor tusima olatiup.</p>
                </div>
                <div className={styles.cardReview}>
                    <img className={styles.cardImage} src='http://magento.loc/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/v/vvp01_main.jpg' alt='placeholder' />
                    <h4><span style={{fontWeight: 'bold'}}>Anabella Kleva </span>/ Boss at TocoToco</h4>
                    <p className={styles.cardDesc}>Sed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna akal semperFusce commodo molestie luctus.Lorem ipsum Dolor tusima olatiup.</p>
                </div>
                </div>
            </div>
        </Fragment>        
    );
}

export default Reviews;