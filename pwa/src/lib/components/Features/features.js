import React from 'react';
import { shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './features.module.css';
import { MessageCircle, CreditCard, RefreshCcw, Share } from 'react-feather';
import { FormattedMessage } from 'react-intl';


const Features = props => {
const classes = mergeClasses(defaultClasses, props.classes);
return (
        <div className={defaultClasses.features}>
            <div className={defaultClasses.featuresItem}>
                        <Share size={40} style={{color: "#5fa30f"}} strokeWidth={1} />
                <div>
                    <h5 style={{fontWeight: '900', fontSize: '19px'}}><FormattedMessage id="Free Delivery" defaultMessage="Free Delivery" /></h5>
                    <p className={defaultClasses.grey}><FormattedMessage id="For all oders over $99" defaultMessage="For all oders over $99" /></p>
                </div>
            </div>
            <div className={defaultClasses.featuresItem}>
                        <RefreshCcw size={40} style={{color: "#5fa30f"}} strokeWidth={1} />
                <div>
                    <h5 style={{fontWeight: '900', fontSize: '19px'}}><FormattedMessage id="90 Days Return" defaultMessage="90 Days Return" /></h5>
                    <p className={defaultClasses.grey}><FormattedMessage id="If goods have problems" defaultMessage="If goods have problems" /></p>
                </div>
            </div>
            <div className={defaultClasses.featuresItem}>
                        <CreditCard size={40} style={{color: "#5fa30f"}} strokeWidth={1} />
                <div>
                    <h5 style={{fontWeight: '900', fontSize: '19px'}}><FormattedMessage id="Secure Payment" defaultMessage="Secure Payment" /></h5>
                    <p className={defaultClasses.grey}><FormattedMessage id="100% secure payment" defaultMessage="100% secure payment" /></p>
                </div>
            </div>
            <div className={defaultClasses.featuresItem}>
                        <MessageCircle size={40} style={{color: "#5fa30f"}} strokeWidth={1} />
                <div>
                    <h5 style={{fontWeight: '900', fontSize: '19px'}}><FormattedMessage id="24/7 Support" defaultMessage="24/7 Support" /></h5>
                    <p className={defaultClasses.grey}><FormattedMessage id="Secure Payment" defaultMessage="Secure Payment" /></p>
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