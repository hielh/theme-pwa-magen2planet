import React, {useRef, useState, useEffect} from 'react';
import styles from './menu.module.css';
import { Menu, ChevronDown, Phone } from 'react-feather';
import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';
import { Link } from 'react-router-dom';
import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';
import NavTrigger from '../Header/navTrigger';
import { RefreshCw, Airplay, Radio, Wind, Aperture, Headphones, Smile, Activity, PhoneCall, Heart, Book, ChevronRight} from 'react-feather';
import SidebarCategories from '../SidebarCategories/sidebarCategories';
import { FormattedMessage } from 'react-intl';


const MenuComponent = () => {

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

  const Departement = <FormattedMessage id="Shop By Departement" defaultMessage="Shop By Departement" />

  return (
    <>
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <div className={styles.departement}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
            <Menu />
            <h5 className={styles.departementTitle}>{Departement}</h5>
            <ChevronDown size={16} />

            <SidebarCategories
              styles={styles}>
            </SidebarCategories>
          </div>
          <div className={styles.mainMenu}>  <NavTrigger />
            { shouldRenderItems && megaMenuData.children && <ul className={styles.menuItems} ref={mainNavRef} >
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
                     <FormattedMessage id={item.name} defaultMessage={item.name} />
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
                        <FormattedMessage id={option.name} defaultMessage={option.name} />
                        </li>
                    </Link>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>}
          </div>
          <div className={styles.phone}>
            <Phone size={17} strokeWidth={1} style={{marginRight: '10px'}} />
            <FormattedMessage id="Hoteline" defaultMessage="Hoteline" />: 1-800-234-5678
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default MenuComponent;
