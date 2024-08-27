import React, {useRef, useState, useEffect} from 'react';
import styles from './menu.module.css';
import { Menu, ChevronDown, Phone } from 'react-feather';
import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';
import { Link } from 'react-router-dom';
import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';
import NavTrigger from '../Header/navTrigger';
import { RefreshCw, Airplay, Radio, Wind, Aperture, Headphones, Smile, Activity, PhoneCall, Heart, Book, ChevronRight} from 'react-feather';

const MenuComponent = () => {

  const categories = [
    { title: 'Consumer Electric', icon: <RefreshCw size={20} /> },
    { title: 'Organic', icon: <Airplay size={20} /> },
    { title: 'Home, Garden & Kitchen', icon: <Radio size={20} /> },
    { title: 'Clothing & Apparel', icon: <Wind size={20} /> },
    { title: 'Jewelry & Watches', icon: <Aperture size={20} /> },
    { title: 'Computers & Technologies', icon: <Headphones size={20} /> },
    { title: 'Babies & Moms', icon: <Smile size={20} /> },
    { title: 'Sport & Outdoor', icon: <Activity size={20} /> },
    { title: 'Phones & Accessories', icon: <PhoneCall size={20} /> },
    { title: 'Health & Beauty', icon: <Heart size={20} /> },
    { title: 'Books & Office', icon: <Book size={20} /> }
  ];

  const mainNavRef = useRef(null);
  const {
    megaMenuData,
    activeCategoryId,
    subMenuState,
    disableFocus,
    handleSubMenuFocus,
    categoryUrlSuffix,
    handleNavigate,
    handleClickOutside
  } = useMegaMenu({ mainNavRef });

  const [mainNavWidth, setMainNavWidth] = useState(0);
    const shouldRenderItems = useIsInViewport({
        elementRef: mainNavRef
    });

    useEffect(() => {
        const handleResize = () => {
            const navWidth = mainNavRef.current
                ? mainNavRef.current.offsetWidth
                : null;

            setMainNavWidth(navWidth);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

  const handleMouseEnter = () => {
    document.querySelector(`.${styles.menuContainer}`).classList.add(styles.hovered);
  };

  const handleMouseLeave = () => {
    document.querySelector(`.${styles.menuContainer}`).classList.remove(styles.hovered);
  };

  return (
    <>
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <div className={styles.departement}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
            <Menu />
            <h5>Shop By Departement</h5>
            <ChevronDown size={16} />
            <ul className={styles.departementList}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                {categories.map((option, optIndex) => (
                    <li key={optIndex} className={styles.departementListItem} > 
                      <div className={styles.sideMenuItem}>
                        {option.icon} 
                        <a style={{marginLeft: '10px'}} href="#">{option.title}</a>
                      </div>
                      {optIndex % 2 === 0 && (
                        <div>
                          <ChevronRight size={20} />
                        </div>
                      )}
                      <div className={styles.departementListItemMenu}>
                        <ul className={styles.categories}>
                          <li className={styles.categoryItem}>Bright stars fill sky</li>
                          <li className={styles.categoryItem}>Quiet moments bring clarity</li>
                          <li className={styles.categoryItem}>Dreams turn into reality</li>
                          <li className={styles.categoryItem}>Soft whispers of evening</li>
                          <li className={styles.categoryItem}>Fresh breeze through window</li>
                          <li className={styles.categoryItem}>Laughter echoes through halls</li>
                          <li className={styles.categoryItem}>Simple joys bring happiness</li>
                          <li className={styles.categoryItem}>New adventures await you</li>
                      </ul>
                      </div>
                    </li>
                ))}
            </ul>
          </div>
          <div>  <NavTrigger />
            { shouldRenderItems &&  <ul className={styles.menuItems} ref={mainNavRef} >
              {megaMenuData.children.map((item, index) => (
                <li
                  key={index}
                  className={styles.menuItem}
                  onMouseEnter={()=>{handleMouseEnter(); handleSubMenuFocus();}}
                  onMouseLeave={(e)=>{handleMouseLeave(); handleClickOutside(e); }}
                >
                  <Link className={styles.menuItemSpan}
                    onClick={handleNavigate}
                    to={`/${item.url_path}${categoryUrlSuffix || ''}`}
                    > 
                    {item.name} 
                  </Link>
                  { item?.children.length > 0 && <ChevronDown size={16} />}
                  <ul className={styles.submenuItems}>
                    {item?.children?.map((option, optIndex) => (
                      <Link 
                      key={optIndex}
                      onClick={handleNavigate}
                      to={`/${option.url_path}${categoryUrlSuffix || ''}`}
                    >
                      <li className={styles.submenuItem}>
                        {option.name}
                        </li>
                    </Link>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>}
          </div>
          <div className={styles.phone}>
            <Phone />
            Hoteline: 1-800-234-5678
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default MenuComponent;
