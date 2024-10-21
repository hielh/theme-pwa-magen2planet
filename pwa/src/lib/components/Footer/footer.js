import React, { Fragment } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import Logo from '@magento/venia-ui/lib/components/Logo';
import Newsletter from '@magento/venia-ui/lib/components/Newsletter';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Footer/footer.module.css';
import { DEFAULT_LINKS, LOREM_IPSUM } from '@magento/venia-ui/lib/components/Footer/sampleData';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

const Footer = props => {
    const { links } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { copyrightText } = talonProps;
    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Venia' });

    const SafePayment = <FormattedMessage id="We Using Safe Payment For" defaultMessage="We Using Safe Payment For" />
    const AllRights = <FormattedMessage id="All Rights Reserved" defaultMessage="All Rights Reserved" />

    const linkGroups = Array.from(links, ([groupKey, linkProps]) => {
        const linkElements = Array.from(linkProps, ([text, pathInfo]) => {
            let path = pathInfo;
            let Component = Fragment;
            if (pathInfo && typeof pathInfo === 'object') {
                path = pathInfo.path;
                Component = pathInfo.Component;
            }

            const itemKey = `text: ${text} path:${path}`;
            const child = path ? (
                <Link data-cy="Footer-link" className={classes.link} to={path}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </Link>
            ) : (
                <span data-cy="Footer-label" className={classes.label}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </span>
            );

            return (
                <Component key={itemKey}>
                    <li className={classes.linkItem}>{child}</li>
                </Component>
            );
        });

        return (
            <ul key={groupKey} className={classes.linkGroup}>
                {linkElements}
            </ul>
        );
    });

    return (
        <>
        <hr></hr>
        <footer data-cy="Footer-root" className={classes.root}>
            <div className={classes.links}>
                {linkGroups}
                <div className={classes.callout}>
                <Newsletter />
                    <span
                        data-cy="Footer-calloutHeading"
                        className={classes.calloutHeading}
                    >
                        <FormattedMessage
                            id={'footer.followText'}
                            defaultMessage={'Follow Us!'}
                        />
                    </span>
                    <p
                        data-cy="Footer-calloutText"
                        className={classes.calloutBody}
                    >
                    </p>
                    <ul className={classes.socialLinks}>
                        <li>
                            <Twitter size={20} style={{color: "#0cf"}} />
                        </li>
                        <li>
                            <Facebook size={20} style={{color: "#369"}} />
                        </li>
                        <li>
                            <Instagram size={20} style={{color: "#963"}} />
                        </li>
                        <li>
                            <Youtube size={20} style={{color: "#c33"}} />
                        </li>
                    </ul>
                </div>
            </div>
            <div className={classes.branding}>
                <ul className={classes.legal}>
                    <li data-cy="Footer-terms" className={classes.terms}>
                        {SafePayment}
                    </li>
                    <img src="https://martfury03.magebig.com/media/webps/png/media/wysiwyg/magebig/payment/payment.webp"></img>
                </ul>
                <p className={classes.copyright}>© {new Date().getFullYear()} Mage2Planet. {AllRights}</p>
            </div>
        </footer>
        </>
    );
};

export default Footer;

Footer.defaultProps = {
    links: DEFAULT_LINKS
};

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
