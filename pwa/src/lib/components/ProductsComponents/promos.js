import React, {Fragment, useEffect, useState, useRef, lazy, Suspense} from 'react';
import styles from './promos.module.css';
import { useCmsPage } from '@magento/peregrine/lib/talons/Cms/useCmsPage';
import CmsBlockGroup from '@magento/venia-ui/lib/components/CmsBlock';
const RichContent = lazy(
    () => import('@magento/venia-ui/lib/components/RichContent')
)


const Promos = () => {
    // const url = process.env.MAGENTO_BACKEND_URL;
    // const image1 = `${url}/media/wysiwyg/juce_2.png`;
    // const image2 = `${url}/media/wysiwyg/fish_2.png`;

    const identifier = "header-hero";
    // const talonProps = useCmsPage({ identifier : identifier});
    // const { cmsPage } = talonProps;

    return (
        <div className='component' style={{maxWidth: '1200px', overflow: 'hidden', margin: 'auto', marginTop: '50px'}}>
            { identifier &&
            <Suspense fallback={"Loading..."}>
                <CmsBlockGroup identifiers={['header-hero']}/>
            </Suspense>
            }
        </div>
        // <div className={styles.promoSection}>
        //     <div className={styles.promoItem}>
        //         <img
        //             src={image1}
        //             alt="Fresh Summer With Pineapple Juice"
        //             className={styles.promoImage}
        //         />
        //         <div className={styles.promoContent}>
        //             <h2 className={styles.promoContentH2}>Fresh Summer With Pineapple Juice</h2>
        //             <p>Just <span className={styles.promoContentPrice}>$159.99</span></p>
        //             <button className={styles.shopNowButton}>Shop now</button>
        //         </div>
        //     </div>
        //     <div className={styles.promoItem}>
        //         <img
        //             src={image2}
        //             alt="Raw Fish Seabass With Spices"
        //             className={styles.promoImage}
        //         />
        //         <div className={styles.promoContent}>
        //             <h2 className={styles.promoContentH2}>Raw Fish Seabass With Spices</h2>
        //             <p>Sale <span className={styles.salePrice}>25% off</span></p>
        //             <button className={styles.shopNowButton}>Shop now</button>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Promos;