import React from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Footer from '../Footer';
import Header from '../Header';
import MenuComponent from '../BigMenu/menu';
import defaultClasses from './main.module.css';
import HomeSlider from '../ProductsComponents/homeslider';
import SliderBlock from '../HomeSliderBlock/sliderBlock';

const Main = props => {
    const { children, isMasked } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    return (
        <main className={rootClass}>
            <Header />
            <MenuComponent />
            {/* <HomeSlider/> */}
            {window.location.pathname === "/" && <SliderBlock></SliderBlock> }
            <div className={pageClass}>{children}</div>
            <Footer />
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
