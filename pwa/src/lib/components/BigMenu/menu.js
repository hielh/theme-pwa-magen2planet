import React, {useRef, useState, useEffect} from 'react';
import styles from './menu.module.css';
import { Menu, ChevronDown, Phone } from 'react-feather';
import { useMegaMenu } from '@magento/peregrine/lib/talons/MegaMenu/useMegaMenu';
import { Link } from 'react-router-dom';
import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';
import NavTrigger from '../Header/navTrigger';

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
                {['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9'].map((option, optIndex) => (
                    <li key={optIndex} className={styles.departementListItem} ><a href="#">{option}</a></li>
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
    </>
  );
}

export default MenuComponent;
