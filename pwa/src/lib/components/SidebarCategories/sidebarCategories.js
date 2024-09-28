import React, {useRef, useState, useEffect} from 'react';
import {gql, useQuery} from '@apollo/client';
import styles from '../BigMenu/menu.module.css';
import { Airplay, ChevronRight} from 'react-feather';
import { Link } from 'react-router-dom';



const SidebarCategories = (props) => {

    const CategoryListingFragment = gql`
    query categoryList($ids: [String!], $parentId: [String!]) {
    categoryList(
      filters: {
        ids: { in: $ids }
        parent_id: { in: $parentId }
      }
    ){
    uid
    children_count
    name
    children {
      uid
      level
      name
      path
      url_path
      url_key
      children {
        uid
        level
        name
        path
        url_path
        url_key
      }
    }
    }
    }
  `;

    const { error, loading, data: sidebarCategoriesData } = useQuery(CategoryListingFragment, {
        variables: { ids: [8, 11, 14, 3, 15, 7], parentId: ["2"] },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });


    useEffect(() => {
        console.log(sidebarCategoriesData, 'CategoryListingFragment');
    },[sidebarCategoriesData]);



    const handleMouseEnter = () => {
        document.querySelector(`.${props.styles.menuContainer}`).classList.add(props.styles.hovered);
    };

    const handleMouseLeave = () => {
        document.querySelector(`.${props.styles.menuContainer}`).classList.remove(props.styles.hovered);
    };

  return (
    <>
        { sidebarCategoriesData && 
        <ul 
            className={props.styles.departementList}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {sidebarCategoriesData.categoryList.map((item, optIndex) => (
                <li key={optIndex}  className={props.styles.departementListItem} > 
                    <div className={props.styles.sideMenuItem}>
                    <a style={{marginLeft: '10px'}} href="#">{item.name}</a>
                    </div>
                    {item.children.length > 0 && (
                        <div>
                            <ChevronRight size={20} />
                        </div>
                    )}
                    { item.children.length > 0 && <div className={props.styles.departementListItemMenu}>
                        <ul className={props.styles.categories}>
                            {item?.children?.map((option, optIndex) => (
                      <Link 
                        key={optIndex}
                        to={`/${option.url_path}${'.html' || ''}`}
                      >
                            <li className={props.styles.categoryItem}>
                                {option.name}
                            </li>
                      </Link>
                            ))}
                        </ul>
                    </div>}
                </li>
            ))}
        </ul>}
    </>
  );
}

export default SidebarCategories;
