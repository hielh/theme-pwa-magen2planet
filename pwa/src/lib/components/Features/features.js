import React from 'react';
import { shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './features.module.css';
import { MessageCircle, CreditCard, RefreshCcw, Share } from 'react-feather';


const Features = props => {
const classes = mergeClasses(defaultClasses, props.classes);
return (
        <div className={defaultClasses.features}>
            <div className={defaultClasses.featuresItem}>
                        <Share size={40} style={{color: "#5fa30f"}} strokeWidth={1} />
                <div>
                    <h5 style={{fontWeight: '900', fontSize: '19px'}}>Free Delivery</h5>
                    <p className={defaultClasses.grey}>For all oders over $99</p>
                </div>
            </div>
            <div className={defaultClasses.featuresItem}>
                        <RefreshCcw size={40} style={{color: "#5fa30f"}} strokeWidth={1} />
                <div>
                    <h5 style={{fontWeight: '900', fontSize: '19px'}}>90 Days Return</h5>
                    <p className={defaultClasses.grey}>If goods have problems</p>
                </div>
            </div>
            <div className={defaultClasses.featuresItem}>
                        <CreditCard size={40} style={{color: "#5fa30f"}} strokeWidth={1} />
                <div>
                    <h5 style={{fontWeight: '900', fontSize: '19px'}}>Secure Payment</h5>
                    <p className={defaultClasses.grey}>100% secure payment</p>
                </div>
            </div>
            <div className={defaultClasses.featuresItem}>
                        <MessageCircle size={40} style={{color: "#5fa30f"}} strokeWidth={1} />
                <div>
                    <h5 style={{fontWeight: '900', fontSize: '19px'}}>24/7 Support</h5>
                    <p className={defaultClasses.grey}>Dedicated support</p>
                </div>
            </div>
        </div>
);
};
export default Features;
Features.propTypes = {
classes: shape({
root: string
})
};