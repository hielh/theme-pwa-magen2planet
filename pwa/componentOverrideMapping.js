const veniaUiPackagePath = '@magento/venia-ui';
const pagebuilderPackagePath = '@magento/pagebuilder';

module.exports = componentOverrideMapping = {
    [`${veniaUiPackagePath}/lib/components/Footer/footer.js`]: 'src/lib/components/Footer/footer.js',
    [`${veniaUiPackagePath}/lib/components/Footer/footer.module.css`]: 'src/lib/components/Footer/footer.module.css',

    [`${veniaUiPackagePath}/lib/components/Newsletter/newsletter.js`]:'src/lib/components/Newsletter/newsletter.js',
    [`${veniaUiPackagePath}/lib/components/Newsletter/newsletter.module.css`]:'src/lib/components/Newsletter/newsletter.module.css',

    [`${veniaUiPackagePath}/lib/components/TextInput/textInput.js`]:'src/lib/components/TextInput/textInput.js',
    [`${veniaUiPackagePath}/lib/components/TextInput/textInput.module.css`]:'src/lib/components/TextInput/textInput.module.css',

    [`${veniaUiPackagePath}/lib/components/Button/button.js`]:'src/lib/components/Button/button.js',
    [`${veniaUiPackagePath}/lib/components/Button/button.module.css`]:'src/lib/components/Button/button.module.css',

    // [`${pagebuilderPackagePath}/lib/ContentTypes/Slider/slider.js`]:'src/lib/ContentTypes/Slider/slider.js',
    // [`${pagebuilderPackagePath}/lib/ContentTypes/Slider/slider.module.css`]:'src/lib/ContentTypes/Slider/slider.module.css',

    [`${veniaUiPackagePath}/lib/components/Header/header.js`]:'src/lib/components/Header/header.js',
    [`${veniaUiPackagePath}/lib/components/Header/header.module.css`]:'src/lib/components/Header/header.module.css',
    [`${veniaUiPackagePath}/lib/components/Header/accountTrigger.js`]:'src/lib/components/Header/accountTrigger.js',
    [`${veniaUiPackagePath}/lib/components/Header/accountTrigger.module.css`]:'src/lib/components/Header/accountTrigger.module.css',
    [`${veniaUiPackagePath}/lib/components/Header/cartTrigger.js`]:'src/lib/components/Header/cartTrigger.js',
    [`${veniaUiPackagePath}/lib/components/Header/cartTrigger.module.css`]:'src/lib/components/Header/cartTrigger.module.css',
    [`${veniaUiPackagePath}/lib/components/Header/currencySwitcher.js`]:'src/lib/components/Header/currencySwitcher.js',
    [`${veniaUiPackagePath}/lib/components/Header/currencySwitcher.module.css`]:'src/lib/components/Header/currencySwitcher.module.css',
    [`${veniaUiPackagePath}/lib/components/Header/navTrigger.js`]:'src/lib/components/Header/navTrigger.js',
    [`${veniaUiPackagePath}/lib/components/Header/navTrigger.module.css`]:'src/lib/components/Header/navTrigger.module.css',
    [`${veniaUiPackagePath}/lib/components/Header/onlineIndicator.js`]:'src/lib/components/Header/onlineIndicator.js',
    [`${veniaUiPackagePath}/lib/components/Header/onlineIndicator.module.css`]:'src/lib/components/Header/onlineIndicator.module.css',
    [`${veniaUiPackagePath}/lib/components/Header/searchTrigger.js`]:'src/lib/components/Header/searchTrigger.js',
    [`${veniaUiPackagePath}/lib/components/Header/searchTrigger.module.css`]:'src/lib/components/Header/searchTrigger.module.css',
    [`${veniaUiPackagePath}/lib/components/Header/storeSwitcher.js`]:'src/lib/components/Header/storeSwitcher.js',
    [`${veniaUiPackagePath}/lib/components/Header/storeSwitcher.module.css`]:'src/lib/components/Header/storeSwitcher.module.css',
    [`${veniaUiPackagePath}/lib/components/Header/switcherItem.js`]:'src/lib/components/Header/switcherItem.js',
    [`${veniaUiPackagePath}/lib/components/Header/switcherItem.module.css`]:'src/lib/components/Header/switcherItem.module.css',

    [`${veniaUiPackagePath}/lib/components/AccountChip/accountChip.js`]:'src/lib/components/AccountChip/accountChip.js',
    [`${veniaUiPackagePath}/lib/components/AccountChip/accountChip.module.css`]:'src/lib/components/AccountChip/accountChip.module.css',



    [`${veniaUiPackagePath}/lib/components/MegaMenu/submenu.module.css`]:'src/lib/components/MegaMenu/submenu.module.css',

    [`${veniaUiPackagePath}/lib/components/SearchBar/searchField.js`]:'src/lib/components/SearchBar/searchField.js',
    [`${veniaUiPackagePath}/lib/components/SearchBar/autocomplete.module.css`]:'src/lib/components/SearchBar/autocomplete.module.css',
    [`${veniaUiPackagePath}/lib/components/SearchBar/autocomplete.js`]:'src/lib/components/SearchBar/autocomplete.js',

    [`${veniaUiPackagePath}/lib/RootComponents/CMS/cms.js`]:'src/lib/RootComponents/CMS/cms.js',
    [`${veniaUiPackagePath}/lib/RootComponents/CMS/cms.module.css`]:'src/lib/RootComponents/CMS/cms.module.css',

    [`${veniaUiPackagePath}/lib/components/Main/main.js`]:'src/lib/components/Main/main.js',
    [`${veniaUiPackagePath}/lib/components/Main/main.module.css`]:'src/lib/components/Main/main.module.css',

    [`${veniaUiPackagePath}/lib/components/CartPage/cartPage.js`]:'src/lib/components/CartPage/cartPage.js',
    [`${veniaUiPackagePath}/lib/components/CartPage/cartPage.module.css`]:'src/lib/components/CartPage/cartPage.module.css',

    [`${veniaUiPackagePath}/lib/components/CartPage/PriceSummary/priceSummary.js`]:'src/lib/components/CartPage/PriceSummary/priceSummary.js',
    [`${veniaUiPackagePath}/lib/components/CartPage/PriceSummary/priceSummary.module.css`]:'src/lib/components/CartPage/PriceSummary/priceSummary.module.css',
    [`${veniaUiPackagePath}/lib/components/CartPage/PriceSummary/discountSummary.module.css`]:'src/lib/components/CartPage/PriceSummary/discountSummary.module.css',

    [`${veniaUiPackagePath}/lib/components/MiniCart/miniCart.module.css`]:'src/lib/components/MiniCart/miniCart.module.css',

    [`${veniaUiPackagePath}/lib/components/ProductFullDetail/productFullDetail.js`]:'src/lib/components/ProductFullDetail/productFullDetail.js',
    [`${veniaUiPackagePath}/lib/components/ProductFullDetail/productFullDetail.module.css`]:'src/lib/components/ProductFullDetail/productFullDetail.module.css',

    [`${veniaUiPackagePath}/lib/components/ProductImageCarousel/carousel.js`]:'src/lib/components/ProductImageCarousel/carousel.js',
    [`${veniaUiPackagePath}/lib/components/ProductImageCarousel/carousel.module.css`]:'src/lib/components/ProductImageCarousel/carousel.module.css',
    [`${veniaUiPackagePath}/lib/components/ProductImageCarousel/thumbnail.js`]:'src/lib/components/ProductImageCarousel/thumbnail.js',
    [`${veniaUiPackagePath}/lib/components/ProductImageCarousel/thumbnail.module.css`]:'src/lib/components/ProductImageCarousel/thumbnail.module.css',

    [`${veniaUiPackagePath}/lib/components/ProductOptions/option.js`]:'src/lib/components/ProductOptions/option.js',
    [`${veniaUiPackagePath}/lib/components/ProductOptions/option.module.css`]:'src/lib/components/ProductOptions/option.module.css',

    [`${veniaUiPackagePath}/lib/RootComponents/Category/category.module.css`]:'src/lib/RootComponents/Category/category.module.css',

    [`${veniaUiPackagePath}/lib/components/Breadcrumbs/breadcrumbs.js`]:'src/lib/components/Breadcrumbs/breadcrumbs.js',
    [`${veniaUiPackagePath}/lib/components/Breadcrumbs/breadcrumbs.module.css`]:'src/lib/components/Breadcrumbs/breadcrumbs.module.css',


    [`${veniaUiPackagePath}/lib/components/App/localeProvider.js`]:'src/lib/components/App/localeProvider.js',
};
