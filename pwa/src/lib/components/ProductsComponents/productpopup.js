import React, { useState } from 'react';
import styles from './productpopup.module.css';
import { Heart, Share, RefreshCcw, CreditCard, MessageCircle, X, Star, Facebook, Twitter, Linkedin } from 'react-feather';
import ImageZoom from './imagezoom';

const ProductPopup = ({ product, onClose }) => {

    const [productId, setProductId] = useState(1);
    const  handleChange = () => {
        setProductId(2);
    }

    const closeProductPopup = (e) => {
        if(e.target.id === 'overlayClickClose'){
            onClose();
        }
    }

  return (
    <>
    <div className={styles.overlay} id='overlayClickClose' onClick={closeProductPopup} >
        <div className={styles.mianPopup}>
        <p className={styles.closeButton} onClick={onClose} style={{cursor: 'pointer'}} ><X size={30} strokeWidth={1}/></p> 
            {/* start header */}
            <div className={styles.header}>
                <div>
                    <p className={styles.headerTitle}>Ocean Spray 100% Juice -10 Ounce Bottle</p>
                    <ul style={{display: 'flex', }}>
                        <li> <Star size={18} style={{color: '#fc0'}}/> </li>
                        <li> <Star size={18} style={{color: '#fc0'}}/> </li>
                        <li> <Star size={18} style={{color: '#fc0'}}/> </li>
                        <li> <Star size={18} style={{color: '#fc0'}}/> </li>
                        <li> <Star size={18} style={{color: 'grey'}}/> </li>
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
                    <img className={styles.imageImg} src={product?.image?.url} alt='Ocean Spray 100% Juice -10 Ounce Bottle' />
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
                            <div  className={styles.reduceQuantity}>-</div>
                            <input className='test' style={{maxWidth: '20px', border: 'none'}} onChange={handleChange} type='text' value={productId}></input>
                            <div  className={styles.increaseQuantity}>+</div>
                        </div>
                        <button className={styles.addToCart}>Add To Cart</button>
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
