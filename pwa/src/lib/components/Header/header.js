import React, { Fragment, Suspense } from 'react';
import { shape, string } from 'prop-types';
import { Link, Route } from 'react-router-dom';

import Logo from '@magento/venia-ui/lib/components/Logo';
import AccountTrigger from './accountTrigger';
import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from './searchTrigger';
import OnlineIndicator from './onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './header.module.css';
import StoreSwitcher from './storeSwitcher';
import CurrencySwitcher from './currencySwitcher';
import MegaMenu from '@magento/venia-ui/lib/components/MegaMenu';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator';
import { useIntl } from 'react-intl';
import { ChevronDown, Heart } from 'react-feather';
import HeaderSearchBar from '../HeaderSearchBar';

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader}>
                    <div className={classes.loaderBefore} />
                    <div className={classes.loaderAfter} />
                </div>
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    const searchBarHead = (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <HeaderSearchBar isOpen={true} ref={searchRef} />
            </Route>
        </Suspense>
    ) ;

    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Venia' });

    return (
        <Fragment>
            <div className={classes.switchersContainer}>
                <p className={classes.switchersContainerPara}>Welcome to Martfury Online Store ! </p>
                <div className={classes.switchers} data-cy="Header-switchers">
                    <div>Store Location</div>
                    <div>Track Order</div>
                    <CurrencySwitcher />
                    <div className={classes.toolbarLang}>
                        <img className="img-fluid" alt="en3" width="18" height="12" src="https://martfury03.magebig.com/media/webps/png/media/wysiwyg/magebig/languages/en3.webp" data-webp="1"></img>
                        English <ChevronDown size={15} />
                    </div>
                </div>
            </div>
            <section >
                <div className={classes.toolbar2}>
                    <Link
                        aria-label={title}
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                        data-cy="Header-logoContainer"
                    >
                        <img title="Martfury - Best Magento Theme 2023" alt="Martfury - Best Magento Theme 2023" width="225" height="50" src="https://martfury03.magebig.com/media/webps/png/media/logo/default/logo-martfury.webp" data-webp="1"></img>
                    </Link>
                    {searchBarHead}
                    <div className={classes.secondaryActions}>
                        <Heart/>
                        <CartTrigger />
                        <AccountTrigger />
                    </div>
                </div>
                <hr></hr>
                <PageLoadingIndicator absolute />
            </section>
            <header className={rootClass} data-cy="Header-root">
                {/* <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                    </div>

                    <Link
                        aria-label={title}
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                        data-cy="Header-logoContainer"
                    >
                        <Logo classes={{ logo: classes.logo }} />
                    </Link>
                    <MegaMenu />
                </div> */}
                {searchBar}
                <PageLoadingIndicator absolute />
            </header>
            <OnlineIndicator
                hasBeenOffline={hasBeenOffline}
                isOnline={isOnline}
            />
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
