import React, { useMemo, useEffect, Fragment, Suspense, useState } from 'react';
import {gql, useQuery} from '@apollo/client';
import { FormattedMessage, useIntl } from 'react-intl';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Info, Star, Facebook, Twitter, Linkedin, Share, RefreshCcw, CreditCard, MessageCircle, ChevronLeft, ChevronRight, ChevronDown } from 'react-feather';

import Price from '@magento/venia-ui/lib/components/Price';
import { useProductFullDetail } from '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import Button from '@magento/venia-ui/lib/components/Button';
import Carousel from '@magento/venia-ui/lib/components/ProductImageCarousel';
import FormError from '@magento/venia-ui/lib/components/FormError';
import QuantityStepper from '@magento/venia-ui/lib/components/QuantityStepper';
import RichContent from '@magento/venia-ui/lib/components/RichContent/richContent';
import { ProductOptionsShimmer } from '@magento/venia-ui/lib/components/ProductOptions';
import CustomAttributes from '@magento/venia-ui/lib/components/ProductFullDetail/CustomAttributes';
import defaultClasses from './productFullDetail.module.css';
import { useGetRelatedProducts } from '../../customHooks/useGetRelatedProducts';
import RelatedProducts from './relatedProducts';
import Rating from '../Rating/rating';

const WishlistButton = React.lazy(() => import('@magento/venia-ui/lib/components/Wishlist/AddToListButton'));
const Options = React.lazy(() => import('@magento/venia-ui/lib/components/ProductOptions'));

// Correlate a GQL error message to a field. GQL could return a longer error
// string but it may contain contextual info such as product id. We can use
// parts of the string to check for which field to apply the error.
const ERROR_MESSAGE_TO_FIELD_MAPPING = {
    'The requested qty is not available': 'quantity',
    'Product that you are trying to add is not available.': 'quantity',
    "The product that was requested doesn't exist.": 'quantity'
};

// Field level error messages for rendering.
const ERROR_FIELD_TO_MESSAGE_MAPPING = {
    quantity: 'The requested quantity is not available.'
};


const ProductFullDetail = props => {
    const { product } = props;
    

    const talonProps = useProductFullDetail({ product });

    const {
        breadcrumbCategoryId,
        errorMessage,
        handleAddToCart,
        handleSelectionChange,
        isOutOfStock,
        isEverythingOutOfStock,
        outOfStockVariants,
        isAddToCartDisabled,
        isSupportedProductType,
        mediaGalleryEntries,
        productDetails,
        customAttributes,
        wishlistButtonProps
    } = talonProps;
    const params = new URLSearchParams(window.location.search);
    const rateSum = params.get('rateSum'); // For a URL like /page?rateSum=60
    // console.log(rateSum, 'The requested rate is');
    

    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);

    const options = isProductConfigurable(product) ? (
        <Suspense fallback={<ProductOptionsShimmer />}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={product.configurable_options}
                isEverythingOutOfStock={isEverythingOutOfStock}
                outOfStockVariants={outOfStockVariants}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    // Fill a map with field/section -> error.
    const errors = new Map();
    if (errorMessage) {
        Object.keys(ERROR_MESSAGE_TO_FIELD_MAPPING).forEach(key => {
            if (errorMessage.includes(key)) {
                const target = ERROR_MESSAGE_TO_FIELD_MAPPING[key];
                const message = ERROR_FIELD_TO_MESSAGE_MAPPING[target];
                errors.set(target, message);
            }
        });

        // Handle cases where a user token is invalid or expired. Preferably
        // this would be handled elsewhere with an error code and not a string.
        if (errorMessage.includes('The current user cannot')) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorToken',
                        defaultMessage:
                            'There was a problem with your cart. Please sign in again and try adding the item once more.'
                    })
                )
            ]);
        }

        // Handle cases where a cart wasn't created properly.
        if (
            errorMessage.includes('Variable "$cartId" got invalid value null')
        ) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorCart',
                        defaultMessage:
                            'There was a problem with your cart. Please refresh the page and try adding the item once more.'
                    })
                )
            ]);
        }

        // An unknown error should still present a readable message.
        if (!errors.size) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorUnknown',
                        defaultMessage:
                            'Could not add item to cart. Please check required options and try again.'
                    })
                )
            ]);
        }
    }

    const customAttributesDetails = useMemo(() => {
        const list = [];
        const pagebuilder = [];
        const skuAttribute = {
            attribute_metadata: {
                uid: 'attribute_sku',
                used_in_components: ['PRODUCT_DETAILS_PAGE'],
                ui_input: {
                    ui_input_type: 'TEXT'
                },
                label: formatMessage({
                    id: 'global.sku',
                    defaultMessage: 'SKU'
                })
            },
            entered_attribute_value: {
                value: productDetails.sku
            }
        };
        if (Array.isArray(customAttributes)) {
            customAttributes.forEach(customAttribute => {
                if (
                    customAttribute.attribute_metadata.ui_input
                        .ui_input_type === 'PAGEBUILDER'
                ) {
                    pagebuilder.push(customAttribute);
                } else {
                    list.push(customAttribute);
                }
            });
        }
        list.unshift(skuAttribute);
        return {
            list: list,
            pagebuilder: pagebuilder
        };
    }, [customAttributes, productDetails.sku, formatMessage]);

    const cartCallToActionText =
        !isEverythingOutOfStock || !isOutOfStock ? (
            <FormattedMessage
                id="productFullDetail.addItemToCart"
                defaultMessage="Add to Cart"
            />
        ) : (
            <FormattedMessage
                id="productFullDetail.itemOutOfStock"
                defaultMessage="Out of Stock"
            />
        );
    // Error message for screen reader
    const cartActionContent = isSupportedProductType ? (
        <section className={classes.actButton}>
            <Button
                data-cy="ProductFullDetail-addToCartButton"
                disabled={isAddToCartDisabled}
                aria-disabled={isAddToCartDisabled}
                aria-label={
                    isEverythingOutOfStock
                        ? formatMessage({
                              id: 'productFullDetail.outOfStockProduct',
                              defaultMessage:
                                  'This item is currently out of stock'
                          })
                        : ''
                }
                priority="high"
                type="submit"
            >
                {cartCallToActionText}
            </Button>
        </section>
    ) : (
        <div className={classes.unavailableContainer}>
            <Info />
            <p>
                <FormattedMessage
                    id={'productFullDetail.unavailableProduct'}
                    defaultMessage={
                        'This product is currently unavailable for purchase.'
                    }
                />
            </p>
        </div>
    );

    const shortDescription = productDetails.shortDescription ? (
        <RichContent html={productDetails.shortDescription.html} />
    ) : null;

    const pageBuilderAttributes = customAttributesDetails.pagebuilder.length ? (
        <section className={classes.detailsPageBuilder}>
            <CustomAttributes
                classes={{ list: classes.detailsPageBuilderList }}
                customAttributes={customAttributesDetails.pagebuilder}
                showLabels={false}
            />
        </section>
    ) : null;

    const [toggleDesc, setToggleDesc] = useState(true);
    const handleToggle = () => {
        setToggleDesc(!toggleDesc);
    // console.log(product, 'productDetails');
    }
    

    return (
        <Fragment>
            {breadcrumbs}
            {/* start header */}
            <div className={classes.header}>
                <div>
                    <p className={classes.headerTitle}>{productDetails.name}</p>
                    <ul style={{display: 'flex', }}>
                            <Rating rating={rateSum} />
                    <span style={{marginLeft: '30px', marginRight: document.documentElement.lang.includes('ar') ? '30px' : '' }}>SKU: <span className={classes.sku}>{productDetails.sku}</span></span>
                    </ul>
                </div>
                {/* <p onClick={onClose} style={{cursor: 'pointer'}} ><X size={30} strokeWidth={1}/></p> */}
                <ul style={{display: 'flex', gap: '5px'}}>
                    <li className={classes.iconf}> <Facebook strokeWidth={0.5} fill='white' size={20} style={{color: 'white'}}/> </li>
                    <li className={classes.icont}> <Twitter strokeWidth={0.5} fill='white' size={20} style={{color: 'white'}}/> </li>
                    <li className={classes.iconl}> <Linkedin strokeWidth={0.5} fill='white' size={20} style={{color: 'white'}}/> </li>
                </ul>
            </div>
            {/* end header */}
            <Form
                className={classes.root}
                data-cy="ProductFullDetail-root"
                onSubmit={handleAddToCart}
            >
                <section className={classes.imageCarousel}>
                    <Carousel images={mediaGalleryEntries} />
                </section>
                <div className={classes.productDetailsSection}>
                    <section className={classes.title}>
                        <h1
                            aria-live="polite"
                            className={classes.productName}
                            data-cy="ProductFullDetail-productPrice"
                        >
                        <Price
                            currencyCode={productDetails.price.currency}
                            value={productDetails.price.value}
                        />
                        </h1>
                        <p
                            data-cy="ProductFullDetail-Stock"
                            style={{color: '#5fa30f'}}
                        >
                            {isOutOfStock? 'Out of Stock' : 'In Stock'}
                        </p>
                        {/* {shortDescription}  this was the original description, and replaced it with the p down */}
                        <div style={{maxHeight: '90px', overflowY: 'hidden'}}>
                            <RichContent html={productDetails.description} />
                        </div>
                    </section>
                    <FormError
                        classes={{
                            root: classes.formErrors
                        }}
                        errors={errors.get('form') || []}
                    />
                    {/*<section className={classes.actions}>
                        {/* {cartActionContent} 
                        <Suspense fallback={null}>
                            <WishlistButton {...wishlistButtonProps} />
                        </Suspense>
                    </section>*/}
                    <section className={classes.options}>{options}</section>
                    <section className={classes.quantity}>
                        {/* <span
                            data-cy="ProductFullDetail-quantityTitle"
                            className={classes.quantityTitle}
                        >
                            <FormattedMessage
                                id={'global.quantity'}
                                defaultMessage={'Quantity'}
                            />
                        </span> */}
                        <div style={{ padding: '10px' }}>
                        <span className={classes.productQuantity}><FormattedMessage id="Quantity :" defaultMessage="Quantity :" /></span>
                        <QuantityStepper
                            classes={{ root: classes.quantityRoot }}
                            min={1}
                            message={errors.get('quantity')}
                        />
                        </div>
                        {cartActionContent}
                    </section>
                </div>
                {/* start sidebar */}
                <div>
                    <div className={classes.sidebar}>
                        <div className={classes.methods}>
                            <div className={classes.method}>
                                <Share className={classes.methodIcon}/>
                                <div>
                                    <h5 className={classes.sidebarHeaders}><FormattedMessage id="Free Delivery" defaultMessage="Free Delivery" /></h5>
                                    <p><FormattedMessage id="For all oders over $99" defaultMessage="For all oders over $99" /></p>
                                </div>
                            </div>
                            <div className={classes.method}>
                                <RefreshCcw className={classes.methodIcon}/>
                                <div>
                                    <h5 className={classes.sidebarHeaders}><FormattedMessage id="90 Days Return" defaultMessage="90 Days Return" /></h5>
                                    <p><FormattedMessage id="If goods have problems" defaultMessage="If goods have problems" /></p>
                                </div>
                            </div>
                            <div className={classes.method}>
                                <CreditCard className={classes.methodIcon}/>
                                <div>
                                    <h5 className={classes.sidebarHeaders}><FormattedMessage id="Secure Payment" defaultMessage="Secure Payment" /></h5>
                                    <p><FormattedMessage id="100% secure payment" defaultMessage="100% secure payment" /></p>
                                </div>
                            </div>
                            <div className={classes.method}>
                                <MessageCircle className={classes.methodIcon}/>
                                <div>
                                    <h5 className={classes.sidebarHeaders}><FormattedMessage id="24/7 Support" defaultMessage="24/7 Support" /></h5>
                                    <p><FormattedMessage id="Dedicated support" defaultMessage="Dedicated support" /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={classes.offerTitle}> */}
                    <div className={classes.special}>
                        <div className={classes.specialHeading}>
                            <h3 className={classes.specialTitle}><FormattedMessage id="Special Offers" defaultMessage="Special Offers" /></h3>
                            <span className={classes.specialIcons}><ChevronLeft size={35} color='#e1e1e1' strokeWidth={1} /> <ChevronRight size={35} color='#e1e1e1' strokeWidth={1} /></span>
                        </div>
                        <div className={classes.specialBody}>
                            <div className={classes.specialOffer}>
                                <img className={classes.specialimage} src="/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/a/va20-gb_main.jpg" alt="" />
                                <div className={classes.offerTitle}>
                                    <p>Marshall PBluetooth Speaker</p>
                                    <span className={classes.offerPrice}>$250.00</span>
                                </div>
                            </div>
                            <div className={classes.specialOffer}>
                            <img className={classes.specialimage} src="/media/catalog/product/cache/f40c6f668743ff332496cd79549bd170/v/a/va19-go_main.jpg" alt="" />
                                <div className={classes.offerTitle}>
                                    <p>Samsung 55-Inch 4K Ultra HD Smart LED</p>
                                    <span className={classes.offerPrice}>$250.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end sidebar */}
            </Form>

            <div className={classes.descriptionBarContainer}>
                <div className={classes.reviewsBar} onClick={handleToggle}>
                    <h2 className={classes.descriptionBar}><FormattedMessage id="Details" defaultMessage="Details" /></h2>
                    <span><ChevronDown size={25} strokeWidth={1} style={{rotate: toggleDesc ? '180deg' : ''}} /></span>
                </div>
            </div>
            <div className={`${classes.descriptionWrapper} ${toggleDesc ? classes.descriptionWrapperOpen : ''}`}>
                <div className={classes.descriptionSection}>
                    <section className={classes.description}>
                        <span
                            data-cy="ProductFullDetail-descriptionTitle"
                            className={classes.descriptionTitle}
                        >
                            <FormattedMessage
                                id={'productFullDetail.description'}
                                defaultMessage={'Description'}
                            />
                        </span>
                        <RichContent html={productDetails.description} />
                    </section>
                    <section className={classes.details}>
                        <span
                            data-cy="ProductFullDetail-detailsTitle"
                            className={classes.detailsTitle}
                        >
                            <FormattedMessage
                                id={'productFullDetail.details'}
                                defaultMessage={'Details'}
                            />
                        </span>
                        <CustomAttributes
                            customAttributes={customAttributesDetails.list}
                        />
                    </section>
                    {/* {pageBuilderAttributes} */}
                </div>
            </div>
                <RelatedProducts product={product} />
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        cartActions: string,
        description: string,
        descriptionTitle: string,
        details: string,
        detailsPageBuilder: string,
        detailsPageBuilderList: string,
        detailsTitle: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        quantityRoot: string,
        root: string,
        title: string,
        unavailableContainer: string
    }),
    product: shape({
        __typename: string,
        id: number,
        stock_status: string,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        media_gallery_entries: arrayOf(
            shape({
                uid: string,
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ),
        description: string,
        short_description: shape({
            html: string,
            __typename: string
        })
    }).isRequired
};

export default ProductFullDetail;
